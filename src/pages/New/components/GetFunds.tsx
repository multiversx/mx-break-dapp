import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faWallet } from '@fortawesome/free-solid-svg-icons';
import { SpammerItem } from '../../../components/SpammerCard/SpammerItem.tsx';
import { useAppProvider } from '../../../AppContext.tsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import { useFaucet } from '../../../hooks/useFaucet.ts';
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
      <div className="flex items-center justify-between mt-5 text-gray-200">
        <div className={`flex flex-col mr-5 ${showBalance ? 'hidden' : ''}`}>
          <div className="text-gray-400 mb-2">
            <span className="font-medium">Balance</span>
          </div>
          <div className="text-gray-200">
            <span className="font-medium max-w-50 text-wrap break-all text-teal">
              {formattedBalance} xEGLD
            </span>
          </div>
        </div>

        {showRecaptcha ? (
          <div className="flex flex-col">
            {address && (
              <div className="faucet-recaptcha">
                <ReCAPTCHA sitekey={sitekey} onChange={onRecaptchaChange} theme="dark" />
              </div>
            )}
            <button
              disabled={requestDisabled || claiming}
              onClick={() => claimTokens(captcha)}
              className={`mr-0 flex items-center text-sm p-4 rounded-2xl ${!address ? 'bg-neutral-600 text-neutral-400' : 'bg-teal text-black '}`}
            >
              {claiming && <FontAwesomeIcon icon={faSpinner} className="fa-1x mx-2" />}
              <span>
                {' '}
                <FontAwesomeIcon icon={faWallet} className="mr-2" />
                Get funds from Faucet
              </span>
            </button>
          </div>
        ) : (
          claiming && <FontAwesomeIcon icon={faSpinner} className="fa-1x mx-2" spin />
        )}
      </div>
    </SpammerItem>
  );
};
