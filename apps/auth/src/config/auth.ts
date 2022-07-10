import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';

export default registerAs('auth', () => ({
  access_token: {
    publicKey: readFileSync('./certs/auth_access_public.pem', 'utf-8'),
    privateKey: readFileSync('./certs/auth_access_private.pem', 'utf-8'),
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '5m',
    },
  },
  refresh_token: {
    publicKey: readFileSync('./certs/auth_refresh_public.pem', 'utf-8'),
    privateKey: readFileSync('./certs/auth_refresh_private.pem', 'utf-8'),
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '1d',
    },
  },
}));
