import { useAppProvider } from '../AppContext.tsx';
import { useCallback } from 'react';
import { CHAIN_ID } from 'config';
import { Transaction } from '@multiversx/sdk-core/out';

export const useGenerateTransaction = () => {
  const { address } = useAppProvider();

  const generateTransaction = useCallback(
    (nonce: number) => {
      if (!address) throw new Error('Address is not defined');

      const transaction = new Transaction({
        nonce,
        sender: address,
        receiver: address,
        value: '0',
        gasLimit: 1000000n,
        chainID: CHAIN_ID,
        version: 0,
      });

      return transaction.toPlainObject();
    },
    [address]
  );

  return {
    generateTransaction,
  };
};
