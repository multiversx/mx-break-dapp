import { useCallback } from 'react';
import { generate } from 'helpers/generate.ts';
import { encrypt } from 'helpers/crypto.ts';
import { getAccessToken } from 'helpers/accessToken/getAccessToken.ts';
import { ENCRIPTION_KEY } from 'const/encription-key.ts';
import { useAppProvider } from '../AppContext.tsx';

export const useGenerateWallet = () => {
  const { dispatch, actions } = useAppProvider();

  return useCallback(async () => {
    const { mnemonic, address } = generate();
    const encrypted = encrypt(mnemonic, `${address}${ENCRIPTION_KEY}`);
    const accessToken = await getAccessToken(address, encrypted);

    dispatch({
      type: actions.CLEAR,
    });
    dispatch({
      type: actions.GENERATE,
      address,
      encrypted,
      accessToken,
    });
  }, []);
};