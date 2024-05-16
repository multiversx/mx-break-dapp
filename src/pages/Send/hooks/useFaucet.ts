import { useCallback } from 'react';
import { useAppProvider } from '../../../AppContext';
import { extrasApi } from 'config';
import { getAccessToken } from 'helpers/accessToken/getAccessToken';

export const useFaucet = () => {
  const { address, encrypted } = useAppProvider();

  const claimTokens = useCallback(async (captcha: string) => {
    if (!address) {
      console.log('No address found');
      return false;
    }

    if (!encrypted) {
      console.log('No encrypted wallet found');
      return false;
    }

    const accessToken = await getAccessToken(address, encrypted);

    try {
      const response = await fetch(`${extrasApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ captcha }),
      });
      const data = await response.json();
      console.log('claimed faucet funds = ', data);
    } catch (error) {
      console.error('Error claiming tokens', error);
      return false;
    }

    // catch (error) {
    //     console.error('Error claiming tokens', error);
    //     return false;
    //     }
    // }

    // if ('error' in response) {
    //   setRequestFailed(true);
    // }
    //
    // if (ref.current !== null) {
    //   setErdsClass('show');
    //   setFundsRecieved(true);
    // }
    //
    // setTimeout(() => {
    //   if (ref.current !== null) {
    //     setErdsClass('hide');
    //   }
    //
    //   setTimeout(() => {
    //     if (ref.current !== null) {
    //       setErdsClass('d-none');
    //     }
    //   }, 300);
    // }, 2000);
    console.log('Claiming tokens');
    return true;
  }, []);

  return {
    claimTokens,
  };
};
