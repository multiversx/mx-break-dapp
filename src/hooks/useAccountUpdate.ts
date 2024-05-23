import { useGetAccountQuery } from 'queries/account.query.ts';

export const useAccountUpdate = () => {
  useGetAccountQuery();
};
