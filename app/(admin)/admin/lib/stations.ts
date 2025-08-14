'use server';
import { apiDataLoader } from '@/lib/api';
import { redis } from '@/lib/redis';

const DETAIL_KEY = 'locationsdetail';
const GEO_KEY = 'locations';

export async function loadStations() {
  return (
    await apiDataLoader({
      DETAIL_KEY,
      urlApi: 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json',
      callback: loadStationInformationIntoValkey,
    })
  )();
}

async function loadStationInformationIntoValkey(stations) {
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
