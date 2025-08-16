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

    // Try to set throttle key for 10 seconds
    const ok = await redis.set(throttleKey, '1', 'EX', 50, 'NX');

    if (ok !== 'OK' && ok !== true) {
      console.log(`🙅‍♂️ ${throttleKey} is already being updated`);
      return;
    }

    // Fetch from API
    const response = await fetch(options.urlApi);
    const data = await response.json();

    // Save stations into Valkey
    // TODO refactor callback to use a more generic input data. 'data.data.stations'
    await options.callback(data.data.stations);

    console.log(`✅ ${options.DETAIL_KEY} data refreshed from API`);
  };
}
