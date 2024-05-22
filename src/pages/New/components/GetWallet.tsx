import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { SpammerItem } from '../../../components/SpammerCard/SpammerItem.tsx';
import { useAppProvider } from '../../../AppContext.tsx';
import { useGenerateWallet } from '../../../hooks/useGenerateWallet.ts';

export const GetWallet = () => {
  const { address } = useAppProvider();
  const generateWallet = useGenerateWallet();
  const { dispatch, actions } = useAppProvider();

  const onDisconnect = () => {
    dispatch({
      type: actions.CLEAR,
    });
  };

  return (
    <SpammerItem
      title={'Get Wallet'}
      subtitle={'Generate a fresh wallet to send transactions and spam the Sovereign Chain'}
    >
      <div className="flex items-center justify-between mt-5 text-gray-200">
        {!address && (
          <button
            onClick={generateWallet}
            className="mr-0 flex items-center bg-teal text-black text-sm p-4 rounded-2xl"
          >
            <FontAwesomeIcon icon={faWallet} className="mr-2" />
            Generate Wallet
          </button>
        )}

        {address && (
          <div className={`flex flex-col mr-5 ${address ? '' : 'hidden'}`}>
            <div className="flex gap-4 text-gray-400 mb-2 text-sm">
              <span className="font-medium">Wallet generated</span>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 m-0 text-sm text-left font-semibold text-teal bg-teal rounded-full" />
                <span className="text-sm font-medium text-teal text-left">Connected</span>
              </div>
              <button className="ml-auto mr-0" onClick={onDisconnect}>
                Disconnect
              </button>
            </div>
            <div className="text-gray-200 text-xs break-all rounded-3xl p-2 bg-gray-600">
              <Trim text={address ?? ''} />
            </div>
          </div>
        )}
      </div>
    </SpammerItem>
  );
};
