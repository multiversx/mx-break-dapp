import { formatAmount } from '@multiversx/sdk-dapp/utils';

export const getFormattedBalance = (balance: string) =>
  formatAmount({
    input: !balance?.includes('...') ? balance ?? '0' : '0',
    decimals: 18,
  });
