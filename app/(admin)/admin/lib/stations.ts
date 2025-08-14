import { redis } from '@/lib/redis';
// import { Station, StationInformation } from '@/types';

const META_KEY = 'locations_meta';
const DETAIL_KEY = 'locationsdetail';
const GEO_KEY = 'locations';

export async function loadStations() {
  'use server';

  // 1️⃣ Get cached metadata (last_updated and ttl)
  const metaJson = await redis.get(META_KEY);
  if (metaJson) {
    const meta = JSON.parse(metaJson) as { last_updated: number; ttl: number };
    const now = Math.floor(Date.now() / 1000);

    if (now - meta.last_updated < meta.ttl) {
      // Cache is fresh — return from Redis
      console.log('Using cached station data from Upstash');
      const stationsMap = await redis.hgetall(DETAIL_KEY);
      return Object.values(stationsMap || {}).map((s) =>
        JSON.parse(s as string)
      );
      // return;
    }
  }

  // 2️⃣ Otherwise fetch from API
  console.log('Fetching fresh station data from API...');
  const res = await fetch(
    'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
  );
  const data = await res.json();

  // Save meta for TTL tracking
  await redis.set(
    META_KEY,
    JSON.stringify({
      last_updated: data.last_updated,
      ttl: data.ttl,
    })
  );

  // Save stations to Redis
  await loadStationInformationIntoValkey(data.data.stations);

  return data.data.stations;
  // return;
}

async function loadStationInformationIntoValkey(stations) {
  // Use pipeline for efficiency
  const pipeline = redis.pipeline();

  stations.forEach((station) => {
    pipeline.geoadd(
      GEO_KEY,
      station.lon, // longitude
      station.lat, // latitude
      station.station_id // member);
    );

    pipeline.hset(DETAIL_KEY, {
      [station.station_id]: JSON.stringify(station),
    });
  });

  await pipeline.exec();
  console.log(`Saved ${stations.length} stations to Upstash`);
}
