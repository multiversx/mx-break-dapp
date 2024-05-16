import { useCallback } from 'react';
import { useAppProvider } from '../../../AppContext';

export const useFaucet = () => {
  const { address } = useAppProvider();

  const claimTokens = useCallback(async () => {
    if (!address) {
      console.log('No address found');
      return false;
    }

    // api call to claim tokens
    console.log('Claiming tokens');
    return true;
  }, []);

  return {
    claimTokens,
  };
};
