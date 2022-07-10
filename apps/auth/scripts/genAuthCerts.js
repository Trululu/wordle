/* eslint-disable @typescript-eslint/no-var-requires */
const { generateKeyPairSync } = require('crypto');
const { writeFileSync } = require('fs');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

writeFileSync('./certs/auth_access_public.pem', publicKey);
writeFileSync('./certs/auth_access_private.pem', privateKey);

const { privateKey: refreshTokenPrivate, publicKey: refreshTokenPublic } =
  generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

writeFileSync('./certs/auth_refresh_public.pem', refreshTokenPublic);
writeFileSync('./certs/auth_refresh_private.pem', refreshTokenPrivate);
