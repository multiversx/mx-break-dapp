import { Decryptor, EncryptedData, Encryptor } from '@multiversx/sdk-wallet/out/crypto';

const encrypt = (value: string, password: string) => {
  return Encryptor.encrypt(Buffer.from(value), password).toJSON();
};

const decrypt = (encrypted: string | object, password: string) => {
  return Decryptor.decrypt(EncryptedData.fromJSON(encrypted), password).toString();
};

export { decrypt, encrypt };
