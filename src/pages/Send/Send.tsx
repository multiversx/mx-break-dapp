import { useGenerateWallet } from './hooks/useGenerateWallet.ts';
import { useAppProvider } from '../../AppContext.tsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import { useFaucet } from './hooks/useFaucet.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFan, faSpinner, faStop } from '@fortawesome/free-solid-svg-icons';
import { formatAmount } from '@multiversx/sdk-dapp/utils';
import { useSpamming } from '../../hooks/useSpamming.ts';

const sitekey = '6LeOnY0fAAAAABCn_KfmqldzSsOEOP1JHvdfyYGd';

export const Send = () => {
  const [captcha, setCaptcha] = useState<string>('');
  const [requestDisabled, setRequestDisabled] = useState(true);

  const { address, balance } = useAppProvider();

  const generateWallet = useGenerateWallet();
  const { claimTokens, claiming } = useFaucet();
  const { start, stop } = useSpamming();

  const formattedBalance = formatAmount({
    input: !balance?.includes('...') ? balance ?? '0' : '0',
    decimals: 18,
  });

  const allowClaimingTokens = Number(formattedBalance) < 1;

  const onRecaptchaChange = (value: string | null) => {
    setRequestDisabled(!value);

    if (value) {
      setCaptcha(value);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-start sm:items-center h-full sm:bg-center">
        <div className="flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl">
          <div className="flex flex-col flex-1 rounded-xl bg-white p-6 justify-center">
            <h2 className="flex text-xl font-medium group">Generate keys</h2>
            <div className="text-gray-400 mb-6">
              <p>Address: {address}</p>
            </div>
            <button onClick={generateWallet} className="bg-blue-500 text-white p-2 rounded-md">
              Generate
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start sm:items-center h-full sm:bg-center">
        <div className="flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl">
          <div className="flex flex-col flex-1 rounded-xl bg-white p-6 justify-center">
            <h2 className="flex text-xl font-medium group">Claim funds (FAUCET)</h2>
            <div className="text-gray-400 mb-6">
              <p>Balance: {formattedBalance} xEGLD</p>
            </div>
            {allowClaimingTokens && (
              <>
                <div className="faucet-recaptcha">
                  <ReCAPTCHA sitekey={sitekey} onChange={onRecaptchaChange} theme="dark" />
                </div>
                <button
                  disabled={requestDisabled || claiming}
                  onClick={() => claimTokens(captcha)}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  {claiming && <FontAwesomeIcon icon={faSpinner} className="fa-1x mx-2" />}
                  <span>Claim</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-start sm:items-center h-full sm:bg-center">
        <div className="flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl">
          <div className="flex flex-col flex-1 rounded-xl bg-white p-6 justify-center">
            <h2 className="flex text-xl font-medium group">Start spamming</h2>
            <div className="flex gap-2">
              <button
                onClick={start}
                className="flex flex-1 bg-blue-500 text-white p-2 rounded-md align-middle justify-center"
              >
                <FontAwesomeIcon icon={faPlay} className="fa-1x p-1" />
                {/*<FontAwesomeIcon icon={faFan} className="fa-1x p-1" spin />*/}
                <span>Start</span>
              </button>
              <button onClick={stop} className="flex flex-1 bg-blue-500 text-white p-2 rounded-md">
                <FontAwesomeIcon icon={faStop} className="fa-1x p-1" />
                <span>Stop</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
