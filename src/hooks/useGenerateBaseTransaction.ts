import { useAppProvider } from '../AppContext';
import { useCallback } from 'react';
import { CHAIN_ID } from 'config';
import { Transaction } from '@multiversx/sdk-core/out';

export const useGenerateBaseTransaction = () => {
  const { address } = useAppProvider();

  const getBaseTransaction = useCallback(() => {
    if (!address) throw new Error('Address is not defined');

    return new Transaction({
      sender: address,
      receiver: address,
      value: '0',
      gasLimit: 50000n,
      chainID: CHAIN_ID,
      version: 0,
    });
  }, [address]);

  const generateTransaction = useCallback(
    (nonce: number) => {
      if (!address) throw new Error('Address is not defined');

      const transaction = getBaseTransaction();
      transaction.setNonce(nonce);

      return {
        transaction,
        serialized: transaction.serializeForSigning(),
      };
    },
    [address, getBaseTransaction]
  );

  return {
    generateTransaction,
    getBaseTransaction,
  };
};
