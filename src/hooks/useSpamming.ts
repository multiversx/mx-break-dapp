import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppProvider } from '../AppContext';
import { delay } from 'helpers/delay';
import { sendSignedTransactions } from 'helpers/transactions/sendSignedTransactions';
import { delayBetweenTransactions, transactionsBatchSize } from 'config';
import { useGenerateSignedTransaction } from './useGenerateSignedTransaction.ts';
import {
  clearSignatureCache,
  removeSignaturesBeforeNonce,
  setSignature,
  getSignatureCache,
} from '../cache/signatureCache.ts';
import type { Transaction } from '@multiversx/sdk-core';

export const useSpamming = () => {
  const { nonce } = useAppProvider();
  const [spamming, setSpamming] = useState(false);
  const infiniteSpamming = useRef(true);
  const latestNonceRef = useRef(nonce);
  const startSignatureNonceRef = useRef(nonce);
  const failedTransactionsRef = useRef<Transaction[]>([]);

  const { generateSignedTransaction } = useGenerateSignedTransaction();

  const generateSignatures = useCallback(async () => {
    while (infiniteSpamming.current) {
      try {
        const cached = await generateSignedTransaction(startSignatureNonceRef.current++);

        if (getSignatureCache()[cached.nonce]) {
          continue;
        }

        console.log({ cache: getSignatureCache() });
        setSignature(cached.nonce, cached.transaction);
      } catch (e) {
        // IGNORE
      } finally {
        await delay(1);
      }
    }
  }, [generateSignedTransaction, nonce]);

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

  // const retryFailedTransactions = useCallback(async () => {
  //   while (infiniteSpamming.current && failedTransactionsRef.current.length > 0) {
  //     const transaction = failedTransactionsRef.current.shift();
  //
  //     if (!transaction) {
  //       continue;
  //     }
  //
  //     try {
  //       await sendSignedTransactions([transaction]);
  //       console.log(`Requeued transaction with nonce ${transaction.nonce} succeeded.`);
  //     } catch (e: unknown) {
  //       // Requeue the transaction again
  //       failedTransactionsRef.current.push(transaction);
  //       await delay(10);
  //     }
  //   }
  // }, []);

  const spam = useCallback(async () => {
    while (infiniteSpamming.current) {
      const batch = getNextBatch();
      console.log({ lastNonce: latestNonceRef.current, batch });

      try {
        await sendSignedTransactions(batch);
      } catch (e) {
        // Add failed transactions to retry list
        failedTransactionsRef.current.push(...batch);
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
    // retryFailedTransactions();
  };

  const stop = () => {
    setSpamming(false);
    infiniteSpamming.current = false;
    latestNonceRef.current = nonce;
  };

  useEffect(() => {
    removeSignaturesBeforeNonce(nonce);
    latestNonceRef.current = nonce;

    const interval = setInterval(() => {
      latestNonceRef.current = nonce;
    }, 1000);

    return () => clearInterval(interval);
  }, [nonce]);

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
  };
};
