import { decrypt } from './crypto.ts';
import { ENCRIPTION_KEY } from '../const/encription-key.ts';
import { UserSecretKey, UserSigner } from '@multiversx/sdk-wallet';
import { Mnemonic } from '@multiversx/sdk-wallet/out';

export const getSigner = async (address: string, encrypted: string | object) => {
  const mnemonic = decrypt(encrypted, `${address}${ENCRIPTION_KEY}`);

  const derivedKey = Mnemonic.fromString(mnemonic).deriveKey(0).hex();
  const secretKey = UserSecretKey.fromString(derivedKey);

  return new UserSigner(secretKey);
};
