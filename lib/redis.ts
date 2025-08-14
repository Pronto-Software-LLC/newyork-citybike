import Valkey from 'iovalkey';

export const redis = new Valkey({
  port: 6379, // Valkey port
  host: '127.0.0.1', // Valkey host
  // username: 'default', // needs Valkey >= 6
  // password: 'my-top-secret',
  db: 0, // Defaults to 0
});
