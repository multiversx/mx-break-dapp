import { Mnemonic, UserSecretKey } from '@multiversx/sdk-wallet';

const generate = () => {
  const words = Mnemonic.generate().getWords();
  const mnemonic = words.join(' ');

  const derivedKey = Mnemonic.fromString(mnemonic).deriveKey(0);
  const secretKey = UserSecretKey.fromString(derivedKey.hex());
  const address = secretKey.generatePublicKey().toAddress().bech32();

  return { mnemonic, address };
};

export { generate };
