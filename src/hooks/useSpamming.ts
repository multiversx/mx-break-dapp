import { useCallback, useEffect, useState } from 'react';
import { useAppProvider } from '../AppContext';
import { delay } from 'helpers/delay';
import { sendSignedTransactions } from 'helpers/transactions/sendSignedTransactions';
import { delayBetweenTransactions } from 'config';
import { useGenerateSignedTransactions } from './useGenerateSignedTransactions.ts';

let infiniteSpamming = true;
let lastNonce = 0;

export const useSpamming = () => {
  const { nonce } = useAppProvider();
  const [spamming, setSpamming] = useState(false);

  const { generateSignedTransactions } = useGenerateSignedTransactions();

  const spam = useCallback(async () => {
    console.log('spamming');

    while (infiniteSpamming) {
      console.log('lastNonce', lastNonce);

      const transactions = await generateSignedTransactions(lastNonce++);

      try {
        await sendSignedTransactions(transactions);
      } catch (e) {
        // IGNORE
      } finally {
        await delay(delayBetweenTransactions);
      }
    }
  }, [generateSignedTransactions]);

  const start = () => {
    infiniteSpamming = true;
    setSpamming(true);
    spam();
  };

  const stop = () => {
    setSpamming(false);
    infiniteSpamming = false;
  };

  useEffect(() => {
    console.log('nonce', nonce);
    lastNonce = nonce;
  }, [nonce, start]);

  return {
    spamming,
    spam,
    start,
    stop,
  };
};
