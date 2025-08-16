'use server';
import { redis } from './redis';

type DataToLoad = {
  DETAIL_KEY: string;
  urlApi: string;
  callback: (data: unknown) => void;
};

export async function apiDataLoader(options: DataToLoad) {
  return async () => {
    const throttleKey = `${options.DETAIL_KEY}:throttle`;

    const isFresh = await redis.get(throttleKey);

    if (isFresh) {
      console.log(`🙅‍♂️ ${options.DETAIL_KEY} is being delivered by cache`);
      return;
    }

    // Fetch from API
    const response = await fetch(options.urlApi);
    const data = await response.json();

    const now = Math.floor(new Date().getTime() / 1000);
    await redis.set(throttleKey, '1', 'EX', now - data.last_updated, 'NX');

    // Save stations into Valkey
    // TODO refactor callback to use a more generic input data. 'data.data.stations'
    await options.callback(data.data.stations);
    console.log(`✅ ${options.DETAIL_KEY} data refreshed from API`);
  };
}
