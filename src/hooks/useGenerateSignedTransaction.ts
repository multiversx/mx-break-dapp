import { useAppProvider } from '../AppContext';
import { useCallback } from 'react';
import { CHAIN_ID } from 'config';
import { Transaction } from '@multiversx/sdk-core/out';
import { useSigner } from './useSigner';

export const useGenerateSignedTransaction = () => {
  const { address } = useAppProvider();
  const { signer } = useSigner();

  const generateSignedTransaction = useCallback(
    async (nonce: number) => {
      if (!address) throw new Error('Address is not defined');
      if (!signer) throw new Error('Signer is not defined');

      const transaction = new Transaction({
        nonce,
        sender: address,
        receiver: address,
        value: '0',
        gasLimit: 50000n,
        chainID: CHAIN_ID,
        version: 0,
      });

      const serializedTransaction = transaction.serializeForSigning();
      const signature = await signer.sign(serializedTransaction);

      transaction.applySignature(signature);

      return {
        nonce,
        transaction,
      };
    },
    [address, signer]
  );

  return {
    generateSignedTransaction,
  };
};
