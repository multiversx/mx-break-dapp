import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faStop } from '@fortawesome/free-solid-svg-icons';
import { SpammerItem } from '../../../components/SpammerCard/SpammerItem';
import { useAppProvider } from '../../../AppContext';
import { useSpamming } from '../../../hooks/useSpamming';
import { formatAmount } from '@multiversx/sdk-dapp/utils';
import { AnimateNumber } from 'components/AnimateNumber/AnimateNumber';

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
      <div className="flex flex-col">
        <div className="flex gap-2">
          {
            <div className={`flex flex-col`}>
              {spamming && (
                <div className="text-neutral-400 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faSpinner} className="fa-1x p-1" spin />
                  <span className="font-roobert-medium text-sm">Sending transactions...</span>
                </div>
              )}

              <button
                disabled={isDisabled}
                onClick={spamming ? stop : start}
                className={`mr-0 flex items-center px-4 py-2 rounded-xl font-roobert-semibold ${isDisabled ? 'bg-neutral-700 text-neutral-400' : 'bg-teal text-black '}`}
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
                <div className="flex justify-start items-center gap-2 mt-2 md:justify-end font-roobert-semibold">
                  <span className="text-neutral-200 text-sm">Sent:</span>
                  <span className="font-medium text-teal text-md">
                    <AnimateNumber
                      amount={
                        transactionsSentCount > transactionsSentCount
                          ? transactionsSentCount / 1000
                          : transactionsSentCount
                      }
                    />{' '}
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
