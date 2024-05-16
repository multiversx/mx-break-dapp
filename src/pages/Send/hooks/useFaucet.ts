import { useCallback, useState } from 'react';
import { useAppProvider } from '../../../AppContext';
import { extrasApi } from 'config';
import { getAccessToken } from 'helpers/accessToken/getAccessToken';

export const useFaucet = () => {
  const [claiming, setClaiming] = useState(false);
  const { address, encrypted, accessToken } = useAppProvider();

  const claimTokens = useCallback(
    async (captcha: string) => {
      if (!address) {
        console.log('No address found');
        return false;
      }

      if (!encrypted) {
        console.log('No encrypted wallet found');
        return false;
      }

      if (!captcha) {
        console.log('No captcha found');
        return false;
      }

      setClaiming(true);

      const bearerToken = accessToken || (await getAccessToken(address, encrypted));

      try {
        const response = await fetch(`${extrasApi}/faucet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({ captcha }),
        });

        if (!response.ok) {
          console.error('Failed to claim tokens', response);
          return false;
        }

        alert('Successfully claimed tokens. Check your balance in a few moments.');
        return true;
      } catch (error) {
        console.error('Error claiming tokens', error);
        return false;
      } finally {
        setClaiming(false);
      }
    },
    [accessToken, address, encrypted]
  );

  return {
    claimTokens,
    claiming,
  };
};
