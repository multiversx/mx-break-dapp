import { Transaction } from '@multiversx/sdk-core/out';

let signatureCache: {
  [none: number]: Transaction;
} = {};

export const getSignatureCache = () => {
  return signatureCache;
};

export const getSignature = (nonce: number) => {
  return signatureCache[nonce];
};

export const setSignature = (nonce: number, transaction: Transaction) => {
  signatureCache[nonce] = transaction;
};

export const removeSignaturesBeforeNonce = (nonce: number) => {
  for (const key in signatureCache) {
    if (parseInt(key) < nonce) {
      delete signatureCache[key];
    }
  }
};

export const clearSignatureCache = () => {
  signatureCache = {};
};
