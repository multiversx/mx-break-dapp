import axios from 'axios';
import { API_URL, apiTimeout } from 'config';
import { Transaction } from '@multiversx/sdk-core';
import { ServerTransactionType } from '@multiversx/sdk-dapp/types';

export async function sendTransaction(transaction: Transaction) {
  return axios.post<ServerTransactionType>(`${API_URL}/transactions`, transaction.toPlainObject(), {
    timeout: apiTimeout,
  });
}
