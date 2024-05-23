import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faSpinner, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { SpammerItem } from '../../../components/SpammerCard/SpammerItem';
import { useAppProvider } from '../../../AppContext';
import { useGenerateWallet } from '../../../hooks/useGenerateWallet';
import { explorerAddress } from 'config';

export const GetWallet = () => {
  const { address } = useAppProvider();
  const { generateWallet, pending } = useGenerateWallet();
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
      <div className="flex items-center justify-between font-roobert-semibold">
        {!address && (
          <button
            onClick={generateWallet}
            className="mr-0 flex items-center bg-teal text-black px-4 py-2 rounded-xl"
          >
            {pending && <FontAwesomeIcon icon={faSpinner} className="mr-2" spin />}
            <FontAwesomeIcon icon={faWallet} className="mr-2" />
            Generate Wallet
          </button>
        )}

        {address && (
          <div className={`flex flex-col ${address ? '' : 'hidden'}`}>
            <div className="flex gap-4 text-neutral-200 mb-2 text-sm">
              <span>Wallet generated</span>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 m-0 text-sm text-left text-teal bg-teal rounded-full" />
                <span className="text-sm text-teal text-left">Connected</span>
              </div>
              <button className="ml-auto mr-0 text-neutral-500" onClick={onDisconnect}>
                Disconnect
              </button>
            </div>
            <div className="flex flex-row gap-3 items-center p-1 text-gray-200 text-xs rounded-3xl bg-neutral-800">
              <div className="ml-1 w-full overflow-hidden text-neutral-300 max-w-40">
                <Trim text={address ?? '...'} />
              </div>
              <div className="flex flex-nowrap flex-shrink-0">
                <a
                  href={`${explorerAddress}/accounts/${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-white bg-neutral-600 p-2 rounded-3xl"
                >
                  <span className="">View in Explorer</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </SpammerItem>
  );
};
