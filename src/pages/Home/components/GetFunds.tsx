import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faWallet } from '@fortawesome/free-solid-svg-icons';
import { SpammerItem } from '../../../components/SpammerCard/SpammerItem';
import { useAppProvider } from '../../../AppContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import { useFaucet } from '../../../hooks/useFaucet';
import { formatAmount } from '@multiversx/sdk-dapp/utils';

const sitekey = '6LeOnY0fAAAAABCn_KfmqldzSsOEOP1JHvdfyYGd';

export const GetFunds = () => {
  const [captcha, setCaptcha] = useState<string>('');
  const [requestDisabled, setRequestDisabled] = useState(true);
  const { address, balance } = useAppProvider();

  const { claimTokens, claiming, successfullyClaimedTokens } = useFaucet();

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
    <SpammerItem
      title={'Get Funds'}
      subtitle={'Use the Faucet to get funds to pay for the spam transaction costs'}
    >
      <div className="flex items-center justify-between font-roobert-semibold">
        <div className={`flex flex-col md:text-right ${showBalance ? 'hidden' : ''}`}>
          <div className="text-neutral-200 text-sm mb-2">
            {!showRecaptcha && claiming && (
              <FontAwesomeIcon icon={faSpinner} className="fa-1x mx-2 text-white" spin />
            )}
            Balance
          </div>
          <div className="font-roobert-medium max-w-50 text-wrap break-all text-teal">
            {formattedBalance} Space Credits
          </div>
        </div>

        {showRecaptcha && (
          <div className="flex flex-col xl:flex-row xl:items-center gap-2">
            {address && (
              <div className="faucet-recaptcha">
                <ReCAPTCHA sitekey={sitekey} onChange={onRecaptchaChange} theme="dark" />
              </div>
            )}
            <div>
              <button
                disabled={requestDisabled || claiming}
                onClick={() => claimTokens(captcha)}
                className={`mr-0 flex items-center px-4 py-2 rounded-xl ${!address ? 'bg-neutral-700 text-neutral-400' : 'bg-teal text-black '}`}
              >
                {claiming && <FontAwesomeIcon icon={faSpinner} className="fa-1x mx-2" />}
                <span>
                  {' '}
                  <FontAwesomeIcon icon={faWallet} className="mr-2" />
                  Get Space Credits
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </SpammerItem>
  );
};
