import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';

export default registerAs('auth', () => ({
  access_token: {
    publicKey: readFileSync('./certs/auth_access_public.pem', 'utf-8'),
  },
}));
