import { getUser } from "cryptic-base";
import bcrypt from "bcryptjs";
import { generateMnemonic } from "bip39";
import { generateRandomAdjective } from "./string";

export async function encryptPrivateKey(key: string): Promise<string> {
  const genSalt = await bcrypt.genSalt(10);

  const hashed = await bcrypt.hash(key, genSalt);

  return hashed;
}

export async function generatePrivateKeys(): Promise<{
  privateKeys: string[];
  encryptedPrivateKeys: string[];
}> {
  let encryptedPrivateKeysArr: null | string[];
  let privateKeysArr: null | string[];
  let userObj: any;

  do {
    privateKeysArr = [];
    encryptedPrivateKeysArr = [];

    for (let i = 0; i < 24; i += 1) {
      const generatedRandomAdjective: string = generateRandomAdjective();

      const encrypted: string = await encryptPrivateKey(
        generatedRandomAdjective
      );

      privateKeysArr.push(generatedRandomAdjective);
      encryptedPrivateKeysArr.push(encrypted);
    }

    userObj = await getUser({ private_keys: encryptedPrivateKeysArr }, []);
  } while (userObj);

  return {
    privateKeys: privateKeysArr,
    encryptedPrivateKeys: encryptedPrivateKeysArr,
  };
}

export const generatePrivateKeysBip39 = async () => {
  const mnemonicArr: string[] = generateMnemonic().split(" ");
  const encryptedArrPromise = mnemonicArr.map(
    async (mnemonic) => await encryptPrivateKey(mnemonic)
  );

  const promised = await Promise.all(encryptedArrPromise);

  return {
    privateKeys: mnemonicArr,
    encryptedPrivateKeys: promised,
  };
};
