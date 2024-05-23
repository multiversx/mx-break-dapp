import { SpammerCard } from '../../../components/SpammerCard/SpammerCard';
import { GetWallet } from './GetWallet';
import { GetFunds } from './GetFunds';
import { SpamTheChain } from './SpamTheChain';

export const SpamSection = () => {
  return (
    <SpammerCard>
      <GetWallet />
      <hr className="border-neutral-800 my-4" />
      <GetFunds />
      <hr className="border-neutral-800 my-4" />
      <SpamTheChain />
    </SpammerCard>
  );
};
