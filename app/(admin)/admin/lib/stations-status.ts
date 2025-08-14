'use server';
import { apiDataLoader } from '@/lib/api';
import { redis } from '@/lib/redis';

const DETAIL_KEY = 'station_status';

export async function loadStationsStatus() {
  return (
    await apiDataLoader({
      DETAIL_KEY,
      urlApi: 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json',
      callback: loadStationStatusIntoValkey,
    })
  )();
}

async function loadStationStatusIntoValkey(stations) {
  const pipeline = redis.pipeline();

  stations.forEach((station) => {
    pipeline.hset(DETAIL_KEY, {
      [station.station_id]: JSON.stringify(station),
    });
  });

  await pipeline.exec();
  console.log(`Saved ${stations.length} stations Status to Valkey`);
}
