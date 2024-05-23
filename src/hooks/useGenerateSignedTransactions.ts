import { useAppProvider } from '../AppContext';
import { useCallback } from 'react';
import { Transaction } from '@multiversx/sdk-core/out';
import { useGenerateBaseTransaction } from './useGenerateBaseTransaction';
import { useSigner } from './useSigner';
import { transactionsBatchSize } from 'config';

export const useGenerateSignedTransactions = () => {
  const { address } = useAppProvider();
  const { generateTransaction } = useGenerateBaseTransaction();
  const { signer } = useSigner();

  const generateSignedTransactions = useCallback(
    async (nonce: number) => {
      const generatedTransactions: { transaction: Transaction; serialized: Buffer }[] = [];
      const signedTransactions: Transaction[] = [];

      if (!address) {
        console.warn('Address is not defined');
        return signedTransactions;
      }

      for (let i = 0; i < transactionsBatchSize; i++) {
        generatedTransactions.push(generateTransaction(nonce + i));
      }

      const signedTransactionsPromises = generatedTransactions.map(({ serialized }) =>
        signer?.sign(serialized)
      );

      const signatures = await Promise.all(signedTransactionsPromises);

      signedTransactions.push(
        ...generatedTransactions.map(({ transaction }, index) => {
          const signature = signatures[index];

          if (signature) {
            transaction.applySignature(signature);
          }
          return transaction;
        })
      );

      return signedTransactions;
    },
    [address, generateTransaction, signer]
  );

  return {
    generateSignedTransactions,
  };
};
