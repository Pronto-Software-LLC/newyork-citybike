import Valkey from 'iovalkey';

export const redis = new Valkey({
  port: process.env.VALKEY_PORT, // Valkey port
  host: process.env.VALKEY_HOST, // Valkey host
  // username: 'default', // needs Valkey >= 6
  // password: 'my-top-secret',
  db: 0, // Defaults to 0
});
