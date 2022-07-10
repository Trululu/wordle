import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';

export default registerAs('auth', () => ({
  access_token: {
    publicKey: readFileSync('./certs/auth_access_public.pem', 'utf-8'),
  },
  refresh_token: {
    publicKey: readFileSync('./certs/auth_refresh_public.pem', 'utf-8'),
  },
}));
