import { useCallback } from 'react';
import { generate } from '../../../helpers/generate';
import { ENCRIPTION_KEY } from '../../../const/encription-key';
import { encrypt } from '../../../helpers/crypto';
import { useAppProvider } from '../../../AppContext';

export const useGenerateWallet = () => {
  const { dispatch, actions } = useAppProvider();

  return useCallback(() => {
    const { mnemonic, address } = generate();
    const encrypted = encrypt(mnemonic, `${address}${ENCRIPTION_KEY}`);

    dispatch({
      type: actions.GENERATE,
      address,
      encrypted,
    });
  }, []);
};
