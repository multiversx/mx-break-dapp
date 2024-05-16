import axios from 'axios';
import { Transaction } from '@multiversx/sdk-core';
import { API_URL, apiTimeout } from 'config';

export type SendSignedTransactionsReturnType = string[];

export async function sendSignedTransactions(
  signedTransactions: Transaction[]
): Promise<SendSignedTransactionsReturnType> {
  const promises = signedTransactions.map((transaction) => {
    return axios.post(`${API_URL}/transactions`, transaction.toPlainObject(), {
      timeout: apiTimeout,
    });
  });
  const response = await Promise.all(promises);

  return response.map(({ data }) => data.txHash);
}
