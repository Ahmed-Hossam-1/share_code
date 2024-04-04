import crypto from 'crypto';

export function passwordHash(password: string): string {
  return crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT || 'mmm', 50, 64, 'sha512')
    .toString('hex');
}
