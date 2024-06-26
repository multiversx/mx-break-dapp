import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppProvider } from '../AppContext';
import { delay } from 'helpers/delay';
import { sendSignedTransactions } from 'helpers/transactions/sendSignedTransactions';
import { delayBetweenTransactions, transactionsBatchSize } from 'config';
import { useGenerateSignedTransaction } from './useGenerateSignedTransaction';
import {
  clearSignatureCache,
  removeSignaturesBeforeNonce,
  setSignature,
  getSignatureCache,
} from '../cache/signatureCache';
import { getFormattedBalance } from 'helpers/getFormattedBalance';

export const useSpamming = () => {
  const { nonce, address, balance } = useAppProvider();
  const [spamming, setSpamming] = useState(false);
  const [transactionsSentCount, setTransactionSentCount] = useState(nonce);
  const infiniteSpamming = useRef(true);
  const previousAddressRef = useRef(address);
  const latestNonceRef = useRef(nonce);
  const latestBalanceRef = useRef(balance);
  const startSignatureNonceRef = useRef(nonce);

  const { generateSignedTransaction } = useGenerateSignedTransaction();

  const generateSignatures = useCallback(async () => {
    while (infiniteSpamming.current) {
      try {
        const cached = await generateSignedTransaction(startSignatureNonceRef.current++);

        if (getSignatureCache()[cached.nonce]) {
          continue;
        }

        setSignature(cached.nonce, cached.transaction);
      } catch (e) {
        // IGNORE
      } finally {
        await delay(1);
      }
    }
  }, [generateSignedTransaction]);

  const getNextBatch = useCallback(() => {
    const batch = [];
    for (let i = latestNonceRef.current; i < latestNonceRef.current + transactionsBatchSize; i++) {
      const cachedValue = getSignatureCache()[i];
      if (cachedValue) {
        batch.push(cachedValue);
      }
    }
    latestNonceRef.current += transactionsBatchSize;
    return batch;
  }, []);

  const spam = useCallback(async () => {
    while (infiniteSpamming.current) {
      const batch = getNextBatch();

      try {
        await sendSignedTransactions(batch);
      } catch (e) {
        // Add failed transactions to retry list
      } finally {
        await delay(delayBetweenTransactions);
      }
    }
  }, [getNextBatch]);

  const start = () => {
    infiniteSpamming.current = true;
    setSpamming(true);
    generateSignatures();

    // gives time for the signatures to be generated
    setTimeout(() => {
      spam();
    }, 1000);
  };

  const stop = () => {
    setSpamming(false);
    infiniteSpamming.current = false;
    latestNonceRef.current = nonce;
  };

  useEffect(() => {
    if (previousAddressRef.current !== address) {
      stop();
      clearSignatureCache();
      startSignatureNonceRef.current = nonce;
      previousAddressRef.current = address;
    }

    if (Number(getFormattedBalance(balance ?? '0')) < 0.1 && latestBalanceRef.current !== balance) {
      stop();
      clearSignatureCache();
      startSignatureNonceRef.current = nonce;
      latestBalanceRef.current = balance;
    }

    removeSignaturesBeforeNonce(nonce);
    latestNonceRef.current = nonce;

    const interval = setInterval(() => {
      latestNonceRef.current = nonce;
      setTransactionSentCount(nonce);
    }, 1000);

    return () => clearInterval(interval);
  }, [nonce, address]);

  useEffect(() => {
    return () => {
      stop();
      clearSignatureCache();
    };
  }, []);

  return {
    spamming,
    spam,
    start,
    stop,
    transactionsSentCount,
  };
};
