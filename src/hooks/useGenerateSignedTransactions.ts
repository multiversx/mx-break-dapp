import { useAppProvider } from '../AppContext.tsx';
import { useCallback } from 'react';
import { Transaction } from '@multiversx/sdk-core/out';
import { useGenerateTransaction } from './useGenerateTransaction';
import { useSigner } from './useSigner';
import { transactionsBatchSize } from 'config';

export const useGenerateSignedTransactions = () => {
  const { address } = useAppProvider();
  const { generateTransaction } = useGenerateTransaction();
  const { signer } = useSigner();

  const generateSignedTransactions = useCallback(
    async (nonce: number) => {
      const signedTransactions: Transaction[] = [];

      if (!address) {
        console.warn('Address is not defined');
        return signedTransactions;
      }

      for (let i = 0; i < transactionsBatchSize; i++) {
        const { transaction, serialized } = generateTransaction(nonce + i);

        const signature = await signer?.sign(serialized);
        if (!signature) {
          console.log('No signature found');
          continue;
        }
        transaction.applySignature(signature);

        signedTransactions.push(transaction);
      }

      return signedTransactions;
    },
    [address, generateTransaction, signer]
  );

  return {
    generateSignedTransactions,
  };
};
