import * as crypto from 'crypto';

export const generateTransactionId = (length: number) => {
  return crypto
    .randomBytes(length)
    .toString('hex')
    .slice(0, length)
    .toUpperCase();
};
