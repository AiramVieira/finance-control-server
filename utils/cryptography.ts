import * as CryptoJS from "crypto-js";

export class AESCipher {
  private key: CryptoJS.lib.WordArray;

  constructor() {
    this.key = CryptoJS.SHA256(process.env.DECRYPT_SECRET_KEY || '');
  }

  encrypt(plainText: string): string {
    const encrypted = CryptoJS.AES.encrypt(plainText, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  decrypt(cipherText: string): string {
    const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
