import * as CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'clave-secreta-por-defecto';

export class CryptoService {
  static encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  }

  static decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static hash(data: string): string {
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
  }
}
