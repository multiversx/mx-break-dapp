import { useCallback, useEffect, useState } from 'react';
import { useGenerateTransaction } from './useGenerateTransaction';
import { useSigner } from './useSigner';
import { useAppProvider } from '../AppContext';
import { delay } from 'helpers/delay';
import { sendTransaction } from 'helpers/transactions/sendTransaction';
import { delayBetweenTransactions } from 'config';

let infiniteSpamming = true;
let lastNonce = 0;

export const useSpamming = () => {
  const { nonce } = useAppProvider();
  const [spamming, setSpamming] = useState(false);

  const { generateTransaction } = useGenerateTransaction();
  const { signer } = useSigner();

  const spam = useCallback(async () => {
    console.log('spamming');

    while (infiniteSpamming) {
      console.log('lastNonce', lastNonce);

      const { transaction, serialized } = generateTransaction(lastNonce++);
      const signature = await signer?.sign(serialized);

      if (!signature) {
        console.log('No signature found');
        return;
      }

      transaction.applySignature(signature);

      try {
        await sendTransaction(transaction);
      } catch (e) {
        // IGNORE
      } finally {
        await delay(delayBetweenTransactions);
      }
    }
  }, [generateTransaction, signer]);

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
