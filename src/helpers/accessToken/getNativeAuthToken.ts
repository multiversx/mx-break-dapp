import { API_URL } from 'config';
import { getSigner } from '../getSigner';
import { NativeAuthConfigType } from 'types/nativeAuthConfig';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { Message, MessageComputer } from '@multiversx/sdk-core/out';

export const defaultNativeAuthConfig: NativeAuthConfigType = {
  expirySeconds: 7200,
  origin: window.location.origin,
  apiAddress: API_URL,
};

export async function getNativeAuthToken(
  address: string,
  encrypted: string | object,
  config = defaultNativeAuthConfig
): Promise<string> {
  try {
    const client = new NativeAuthClient({
      expirySeconds: config.expirySeconds,
      apiUrl: config.apiAddress,
      origin: config.origin,
    });
    const timestamp = Date.now().valueOf();
    const tokenLogin = await client.initialize({ timestamp });
    const messageToSign = `${address}${tokenLogin}`;

    const signer = await getSigner(address, encrypted);

    const message = new Message({
      data: Buffer.from(messageToSign),
    });

    const messageComputer = new MessageComputer();
    const serializedMessage = messageComputer.computeBytesForSigning(message);
    message.signature = await signer.sign(serializedMessage);

    const accessToken = client.getToken(
      address,
      tokenLogin,
      Buffer.from(message.signature).toString('hex')
    );
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.error('failed generating new token', error);
    return '';
  }
}
