import { SpammerCard } from '../../../components/SpammerCard/SpammerCard.tsx';
import { GetWallet } from './GetWallet.tsx';
import { GetFunds } from './GetFunds.tsx';
import { SpamTheChain } from './SpamTheChain.tsx';

export const SpamSection = () => {
  return (
    <SpammerCard>
      <GetWallet />
      <hr className="border-neutral-700 my-4" />
      <GetFunds />
      <hr className="border-neutral-700 my-4" />
      <SpamTheChain />
    </SpammerCard>
  );
};
