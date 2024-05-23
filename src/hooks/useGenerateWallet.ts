import { useCallback, useState } from 'react';
import { generate } from 'helpers/generate';
import { encrypt } from 'helpers/crypto';
// import { getAccessToken } from 'helpers/accessToken/getAccessToken';
import { ENCRIPTION_KEY } from 'const/encription-key';
import { useAppProvider } from '../AppContext';

export const useGenerateWallet = () => {
  const [pending, setPending] = useState<boolean>(false);
  const { dispatch, actions } = useAppProvider();

  const generateWallet = useCallback(() => {
    setPending(true);

    const { mnemonic, address } = generate();
    const encrypted = encrypt(mnemonic, `${address}${ENCRIPTION_KEY}`);
    // const accessToken = await getAccessToken(address, encrypted);

    dispatch({
      type: actions.CLEAR,
    });
    dispatch({
      type: actions.GENERATE,
      address,
      encrypted,
      // no need access token for now
      accessToken: '',
    });

    setPending(false);
  }, []);

  return {
    generateWallet,
    pending,
  };
};
