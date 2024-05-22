import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faStop } from '@fortawesome/free-solid-svg-icons';
import { SpammerItem } from '../../../components/SpammerCard/SpammerItem.tsx';
import { useAppProvider } from '../../../AppContext.tsx';
import { useSpamming } from '../../../hooks/useSpamming.ts';
import { formatAmount } from '@multiversx/sdk-dapp/utils';

export const SpamTheChain = () => {
  const { address, balance } = useAppProvider();
  const { start, stop, spamming, transactionsSentCount } = useSpamming();

  const formattedBalance = formatAmount({
    input: !balance?.includes('...') ? balance ?? '0' : '0',
    decimals: 18,
  });

  const successfullyClaimedTokens = Number(formattedBalance) > 0.1;

  const isDisabled = !address || !successfullyClaimedTokens || Number(formattedBalance) < 0.1;

  return (
    <SpammerItem
      title={'Spam the Chain'}
      subtitle={'Start sending transactions to the demo sovereign chain and try to break it.'}
    >
      <div className="flex flex-col mt-5">
        <div className="flex gap-2">
          {
            <div className={`flex flex-col`}>
              {spamming && (
                <div className="text-gray-400 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faSpinner} className="fa-1x p-1" spin />
                  <span className="font-medium text-xs">Sending transactions...</span>
                </div>
              )}

              <button
                disabled={isDisabled}
                onClick={spamming ? stop : start}
                className={`mr-0 flex items-center text-sm p-4 rounded-2xl ${isDisabled ? 'bg-neutral-600 text-neutral-400' : 'bg-teal text-black '}`}
              >
                {!spamming ? (
                  <>
                    <FontAwesomeIcon icon={faPlay} className="fa-1x p-1" />
                    <span>Start Spamming</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faStop} className="fa-1x p-1" />
                    <span>Stop Spamming</span>
                  </>
                )}
              </button>

              {transactionsSentCount > 0 && (
                <div className="flex justify-start mx-1 my-2">
                  <span className="text-gray-400 text-md mb-2"> Sent: </span>
                  <span className="ml-2 font-medium text-teal text-md">
                    {transactionsSentCount > 1000
                      ? transactionsSentCount / 1000 + 'K'
                      : transactionsSentCount}{' '}
                    txs
                  </span>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </SpammerItem>
  );
};
