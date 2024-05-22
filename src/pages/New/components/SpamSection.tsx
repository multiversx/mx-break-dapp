import { SpammerCard } from '../../../components/SpammerCard/SpammerCard.tsx';
import { GetWallet } from './GetWallet.tsx';
import { GetFunds } from './GetFunds.tsx';
import { SpamTheChain } from './SpamTheChain.tsx';

export const SpamSection = () => {
  return (
    <SpammerCard>
      <GetWallet />
      <GetFunds />
      <SpamTheChain />
    </SpammerCard>
  );
};
