import { useCallback } from 'react';
import { generate } from 'helpers/generate';
import { encrypt } from 'helpers/crypto';
import { getAccessToken } from 'helpers/accessToken/getAccessToken';
import { ENCRIPTION_KEY } from 'const/encription-key';
import { useAppProvider } from '../../../AppContext';

export const useGenerateWallet = () => {
  const { dispatch, actions } = useAppProvider();

  return useCallback(async () => {
    const { mnemonic, address } = generate();
    const encrypted = encrypt(mnemonic, `${address}${ENCRIPTION_KEY}`);
    const accessToken = await getAccessToken(address, encrypted);

    dispatch({
      type: actions.GENERATE,
      address,
      encrypted,
      accessToken,
    });
  }, []);
};
