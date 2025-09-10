'use server';
import { apiDataLoader } from '@/lib/api';
import { getRedis } from '@/lib/redis';

const DETAIL_KEY = 'locationsdetail';
const GEO_KEY = 'locations';

/**
 * Fetches Citibike station information from the GBFS API and saves it into Valkey.
 *
 * @returns {() => Promise<void>} A function that fetches data from the API and saves it into Valkey.
 */
export async function loadStations() {
  return (
    await apiDataLoader({
      DETAIL_KEY,
      urlApi: 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json',
      callback: loadStationInformationIntoValkey,
      lastUpdatedKey: 'last_updated',
    })
  )();
}

/**
 * Saves an array of station information into Valkey.
 * @param {object[]} stations An array of objects with `station_id`, `lon`, and `lat` properties.
 */
async function loadStationInformationIntoValkey(stations) {
  const redis = await getRedis();
  const pipeline = redis.pipeline();

  stations.forEach((station) => {
    pipeline.geoadd(
      GEO_KEY,
      station.lon, // longitude
      station.lat, // latitude
      station.station_id // member
    );

    pipeline.hset(DETAIL_KEY, {
      [station.station_id]: JSON.stringify(station),
    });
  });

  await pipeline.exec();
  console.log(`Saved ${stations.length} stations to Valkey`);
}
