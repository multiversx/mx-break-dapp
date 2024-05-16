import { Mnemonic, UserSecretKey, UserSigner } from '@multiversx/sdk-wallet';
import { useEffect, useState } from 'react';
import { decrypt } from '../helpers/crypto';
import { useAppProvider } from '../AppContext.tsx';
import { ENCRIPTION_KEY } from '../const/encription-key.ts';

const useSigner = () => {
  const { encrypted, address } = useAppProvider();
  const [signer, setSigner] = useState<UserSigner | null>(null);

  useEffect(() => {
    if (!encrypted || !address || !Object.keys(encrypted).length) {
      return;
    }

    (async () => {
      const mnemonic = decrypt(encrypted, `${address}${ENCRIPTION_KEY}`);

      const derivedKey = Mnemonic.fromString(mnemonic).deriveKey(0).hex();
      const secretKey = UserSecretKey.fromString(derivedKey);

      setSigner(new UserSigner(secretKey));
    })();
  }, [address, encrypted]);

  return { signer };
};

export { useSigner };
