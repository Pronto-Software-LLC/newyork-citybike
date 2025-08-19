'use server';
import { redis } from '../lib/redis';

type DataToLoad = {
  DETAIL_KEY: string;
  urlApi: string;
  callback: (data: unknown) => void;
  lastUpdatedKey?: string;
};

/**
 * Fetches data from the API and saves it into Valkey.
 *
 * @param {DataToLoad} options - An object containing the necessary information to fetch data from the API and save it into Valkey.
 * @param {string} options.DETAIL_KEY - The key used to identify the data in Valkey.
 * @param {string} options.urlApi - The URL of the API from which to fetch the data.
 * @param {(data: unknown) => void} options.callback - The function to be called with the fetched data after it has been saved into Valkey.
 * @param {string} [options.lastUpdatedKey] - An optional key used to retrieve the last updated timestamp from the fetched data.
 * @return {() => Promise<void>} A function that fetches data from the API and saves it into Valkey.
 */
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
    if (options.lastUpdatedKey) {
      // retrieve last updated from data using the provided key
      const lastUpdated = data[options.lastUpdatedKey] as number;
      await redis.set(throttleKey, '1', 'EX', now - lastUpdated, 'NX');
    } else {
      // Default to using the current time if no last updated key is provided
      await redis.set(throttleKey, '1', 'EX', 60, 'NX'); // Set a default expiration of 60 seconds
    }
    // Save stations into Valkey
    // TODO refactor callback to use a more generic input data. 'data.data.stations'
    await options.callback(data.data.stations);
    console.log(`✅ ${options.DETAIL_KEY} data refreshed from API`);
  };
}
