import { useCallback, useEffect, useRef } from 'react';
import { useGenerateTransaction } from './useGenerateTransaction.ts';
import { useSigner } from './useSigner.ts';
// import { sendSignedTransactions } from 'helpers/transactions/sendSignedTransactions';
import { useAppProvider } from '../AppContext.tsx';
import { delay } from 'helpers/delay.ts';
import { delayBetweenTransactions } from 'config';

const infiniteSpamming = true;

export const useSpamming = () => {
  const { nonce } = useAppProvider();
  const latestNonceRef = useRef(0);
  const spammingRef = useRef(false);

  const { generateTransaction } = useGenerateTransaction();
  const { signer } = useSigner();

  const spam = useCallback(async () => {
    console.log('spamming');

    while (infiniteSpamming) {
      if (!spammingRef.current) {
        break;
      }

      await delay(delayBetweenTransactions);

      if (nonce >= latestNonceRef.current) {
        latestNonceRef.current = nonce;
      }

      const { transaction, serialized } = generateTransaction(latestNonceRef.current++);
      const signature = await signer?.sign(serialized);

      if (!signature) {
        console.log('No signature found');
        return;
      }

      transaction.applySignature(signature);

      console.log('sending transaction', transaction.toPlainObject());

      // const response = await sendSignedTransactions([transaction]);

      // console.log('transaction sent', response);
    }
  }, [generateTransaction, signer, nonce]);

  const start = () => {
    spammingRef.current = true;
    spam();
  };

  const stop = () => {
    spammingRef.current = false;
  };

  return {
    spamming: spammingRef.current,
    spam,
    start,
    stop,
  };
};
