import { getNativeAuthToken } from './getNativeAuthToken';
import { NativeAuthConfigType } from 'types/nativeAuthConfig';

export async function getAccessToken(
  address: string,
  encrypted: string | object,
  nativeAuthConfig?: NativeAuthConfigType
): Promise<string> {
  if (!address) {
    throw new Error('No address found in session');
  }

  if (!encrypted) {
    throw new Error('Encrypted wallet not found in session');
  }

  return getNativeAuthToken(address, encrypted, nativeAuthConfig);
}
