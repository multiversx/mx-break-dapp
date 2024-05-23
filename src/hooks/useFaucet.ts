import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppProvider } from '../AppContext';
import { API_URL, extrasApi } from 'config';
import { getAccessToken } from 'helpers/accessToken/getAccessToken';
import { formatAmount } from '@multiversx/sdk-dapp/utils';

export const useFaucet = () => {
  const [claiming, setClaiming] = useState(false);
  const [successfullyClaimedTokens, setSuccessfullyClaimedTokens] = useState(false);
  const { address, encrypted, balance, accessToken } = useAppProvider();
  const previousAddressRef = useRef(address);

  const formattedBalance = formatAmount({
    input: !balance?.includes('...') ? balance ?? '0' : '0',
    decimals: 18,
  });

  const claimTokens = useCallback(
    async (captcha: string) => {
      if (!address) {
        console.error('No address found');
        return false;
      }

      if (!encrypted) {
        console.error('No encrypted wallet found');
        return false;
      }

      if (!captcha) {
        console.error('No captcha found');
        return false;
      }

      setClaiming(true);

      const useNativeAuth = API_URL.includes('devnet-') || API_URL.includes('testnet-');
      const bearerToken = useNativeAuth ? await getAccessToken(address, encrypted) : '';

      try {
        const response = await fetch(`${extrasApi}/faucet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: useNativeAuth ? `Bearer ${bearerToken}` : '',
          },
          body: JSON.stringify({ address, captcha }),
        });

        if (!response.ok) {
          console.error('Failed to claim tokens', response);
          return;
        }

        // alert('Successfully claimed tokens. Check your balance in a few moments.');
        setSuccessfullyClaimedTokens(() => true);
      } catch (error) {
        console.error('Error claiming tokens', error);
        setSuccessfullyClaimedTokens(() => true);
      } finally {
        setSuccessfullyClaimedTokens(() => true);
      }
    },
    [accessToken, address, encrypted]
  );

  useEffect(() => {
    if (previousAddressRef.current !== address) {
      setSuccessfullyClaimedTokens(false);
      setClaiming(false);
      previousAddressRef.current = address;
    }

    if (successfullyClaimedTokens && Number(formattedBalance) > 1) {
      setClaiming(false);
    }
    if (Number(formattedBalance) > 1) {
      setSuccessfullyClaimedTokens(true);
    }
  }, [formattedBalance, successfullyClaimedTokens, address]);

  return {
    claimTokens,
    claiming,
    successfullyClaimedTokens,
  };
};
