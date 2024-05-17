import { useGenerateWallet } from './hooks/useGenerateWallet.ts';
import { useAppProvider } from '../../AppContext.tsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import { useFaucet } from './hooks/useFaucet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner, faStop } from '@fortawesome/free-solid-svg-icons';
import { formatAmount } from '@multiversx/sdk-dapp/utils';
import { useSpamming } from 'hooks/useSpamming';
import { CheckmarkSVGIcon } from '../../components/CheckmarSVGIcon.tsx';

const sitekey = '6LeOnY0fAAAAABCn_KfmqldzSsOEOP1JHvdfyYGd';

export const Send = () => {
  const [captcha, setCaptcha] = useState<string>('');
  const [requestDisabled, setRequestDisabled] = useState(true);

  const { address, balance } = useAppProvider();

  const generateWallet = useGenerateWallet();
  const { claimTokens, claiming, successfullyClaimedTokens } = useFaucet();
  const { start, stop, spamming } = useSpamming();

  const formattedBalance = formatAmount({
    input: !balance?.includes('...') ? balance ?? '0' : '0',
    decimals: 18,
  });

  const canClaimTokens = Number(formattedBalance) < 1;

  const onRecaptchaChange = (value: string | null) => {
    setRequestDisabled(!value);

    if (value) {
      setCaptcha(value);
    }
  };

  const showRecaptcha = !claiming && canClaimTokens;
  const showBalance = (!successfullyClaimedTokens && claiming) || showRecaptcha;

  return (
    <div className="w-full p-1 mt-10 flex justify-center">
      <ol className="flex flex-col gap-6 max-w-4xl w-full space-y-4">
        <li className="flex flex-col flex-1 rounded-xl bg-white px-6 justify-center">
          <div
            className={`w-full p-4 ${address ? 'text-green-700 dark:text-green-400' : 'text-gray-100 dark:text-gray-100'} border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 `}
            role="alert"
          >
            <div className="flex items-center justify-between">
              <span className="sr-only">Create wallet</span>
              <h3 className="font-medium">1. Create wallet</h3>

              {address && <CheckmarkSVGIcon />}
            </div>
            <div className="flex items-center justify-between mt-5 text-gray-200">
              <div className={`flex flex-col mr-5 ${address ? '' : 'hidden'}`}>
                <div className="text-gray-400 mb-2">
                  <span className="font-medium">Address</span>
                </div>
                <div className="text-gray-200">
                  <span className="font-medium max-w-50 text-wrap break-all">{address}</span>
                </div>
              </div>

              <button
                onClick={generateWallet}
                className="bg-transparent border-2 border-gray-600 p-2 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </li>
        <li className="flex flex-col flex-1 rounded-xl bg-white px-6 justify-center">
          <div
            className={`w-full p-4 ${successfullyClaimedTokens ? 'text-green-700 dark:text-green-400' : 'text-gray-100 dark:text-gray-100'} border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 `}
            role="alert"
          >
            <div className="flex items-center justify-between">
              <span className="sr-only">Claim funds (FAUCET)</span>
              <h3 className="font-medium">2. Claim funds (FAUCET)</h3>

              {successfullyClaimedTokens && <CheckmarkSVGIcon />}
            </div>
            <div className="flex items-center justify-between mt-5 text-gray-200">
              <div className={`flex flex-col mr-5 ${showBalance ? 'hidden' : ''}`}>
                <div className="text-gray-400 mb-2">
                  <span className="font-medium">Balance</span>
                </div>
                <div className="text-gray-200">
                  <span className="font-medium max-w-50 text-wrap break-all">
                    {formattedBalance} xEGLD
                  </span>
                </div>
              </div>

              {showRecaptcha ? (
                <div className="flex flex-col">
                  <div className="faucet-recaptcha">
                    <ReCAPTCHA sitekey={sitekey} onChange={onRecaptchaChange} theme="dark" />
                  </div>
                  <button
                    disabled={requestDisabled || claiming}
                    onClick={() => claimTokens(captcha)}
                    className="bg-transparent border-2 border-gray-600 p-2 rounded-md"
                  >
                    {claiming && <FontAwesomeIcon icon={faSpinner} className="fa-1x mx-2" />}
                    <span>Claim</span>
                  </button>
                </div>
              ) : (
                claiming && <FontAwesomeIcon icon={faSpinner} className="fa-1x mx-2" spin />
              )}
            </div>
          </div>
        </li>
        <li className="flex flex-col flex-1 rounded-xl bg-white px-6 justify-center">
          <div
            className="w-full p-4 text-yellow-500 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-yellow-500"
            role="alert"
          >
            <div className="flex items-center justify-between">
              <span className="sr-only">Spamming</span>
              <h3 className="font-medium">3. Spamming</h3>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex gap-2">
                <button
                  onClick={start}
                  className="flex flex-1 bg-transparent border-2 border-gray-600 p-2 rounded-md align-middle justify-center"
                >
                  {!spamming ? (
                    <FontAwesomeIcon icon={faPlay} className="fa-1x p-1" />
                  ) : (
                    <FontAwesomeIcon icon={faSpinner} className="fa-1x p-1" spin />
                  )}
                  <span>Start</span>
                </button>
                <button
                  onClick={stop}
                  className="flex flex-1 bg-transparent border-2 border-gray-600 p-2 rounded-md"
                >
                  <FontAwesomeIcon icon={faStop} className="fa-1x p-1" />
                  <span>Stop</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};
