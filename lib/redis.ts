import Valkey from 'iovalkey';

let client: Valkey | null = null;

export async function getRedis() {
  if (!client) {
    client = new Valkey({
      host: process.env.VALKEY_HOST || '127.0.0.1',
      port: Number(process.env.VALKEY_PORT) || 6379,
    });
  }
  return client;
}
