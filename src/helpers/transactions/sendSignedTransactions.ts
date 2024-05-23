import axios from 'axios';
import { apiTimeout, proxyAddress } from 'config';
import { Transaction } from '@multiversx/sdk-core';

export type SendSignedTransactionsReturnType = string[];

export async function sendSignedTransactions(
  signedTransactions: Transaction[]
): Promise<SendSignedTransactionsReturnType> {
  return axios.post(
    `${proxyAddress}/transaction/send-multiple`,
    signedTransactions.map((x) => x.toPlainObject()),
    {
      timeout: apiTimeout,
    }
  );
}
