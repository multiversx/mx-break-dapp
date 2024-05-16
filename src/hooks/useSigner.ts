import { UserSigner } from '@multiversx/sdk-wallet';
import { useEffect, useState } from 'react';
import { useAppProvider } from '../AppContext';
import { getSigner } from '../helpers/getSigner';

const useSigner = () => {
  const { encrypted, address } = useAppProvider();
  const [signer, setSigner] = useState<UserSigner | null>(null);

  useEffect(() => {
    if (!encrypted || !address || !Object.keys(encrypted).length) {
      return;
    }

    (async () => {
      const signer = await getSigner(address, encrypted);
      setSigner(signer);
    })();
  }, [address, encrypted]);

  return { signer };
};

export { useSigner };
