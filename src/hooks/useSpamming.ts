import { useCallback, useEffect, useState } from 'react';
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
import { Transaction } from '@multiversx/sdk-core/out';

let infiniteSpamming = true;
let latestNonce = 0;

export const useSpamming = () => {
  const { nonce } = useAppProvider();
  const [spamming, setSpamming] = useState(false);

  const { generateSignedTransaction } = useGenerateSignedTransaction();

  const generateSignatures = useCallback(async () => {
    while (infiniteSpamming) {
      try {
        const cached = await generateSignedTransaction(latestNonce++);

        if (getSignatureCache()[cached.nonce]) {
          continue;
        }

        console.log({ cached });
        setSignature(cached.nonce, cached.transaction);
      } catch (e) {
        // IGNORE
      } finally {
        await delay(10);
      }
    }
  }, [generateSignedTransaction]);

  const getSignaturesFromTheLatestNonce = useCallback(() => {
    const signatures: { [nonce: number]: Transaction } = {};

    for (let i = nonce; i < nonce + transactionsBatchSize; i++) {
      const signatureValue = getSignatureCache()[i];

      if (signatureValue) {
        signatures[i] = signatureValue;
      }
    }

    return signatures;
  }, [nonce]);

  const spam = useCallback(async () => {
    while (infiniteSpamming) {
      const signatures = getSignaturesFromTheLatestNonce();
      const transactions = Object.entries(signatures).map(([, transaction]) => transaction);

      console.log({ transactions });

      try {
        await sendSignedTransactions(transactions);
      } catch (e) {
        // IGNORE
      } finally {
        await delay(delayBetweenTransactions);
      }
    }
  }, [getSignaturesFromTheLatestNonce]);

  const start = () => {
    infiniteSpamming = true;
    setSpamming(true);
    generateSignatures();
    spam();
  };

  const stop = () => {
    setSpamming(false);
    infiniteSpamming = false;
  };

  // useEffect(() => {
  //   generateSignatures();
  // }, [generateSignatures]);

  useEffect(() => {
    removeSignaturesBeforeNonce(nonce);
    latestNonce = nonce;
  }, [nonce, start]);

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
