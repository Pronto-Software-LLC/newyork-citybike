'use server';
import { redis } from '@/lib/redis';

const META_KEY = 'station_status_meta';
const DETAIL_KEY = 'station_status';

export async function loadStationsStatus() {
  // 1️⃣ Check cached metadata
  const metaJson = await redis.get(META_KEY);
  if (metaJson) {
    const meta = JSON.parse(metaJson) as { last_updated: number; ttl: number };
    const now = Math.floor(Date.now() / 1000);

    if (now - meta.last_updated < meta.ttl) {
      console.log('🆗 Station Status cache is fresh — no update needed');
      return; // ✅ Do nothing if cache is valid
    }
  }

  // 2️⃣ Fetch from API if stale or missing
  console.log('🔆 Fetching fresh station Status data from API...');
  const res = await fetch(
    'https://gbfs.citibikenyc.com/gbfs/en/station_status.json'
  );
  const data = await res.json();

  // 3️⃣ Update meta
  await redis.set(
    META_KEY,
    JSON.stringify({
      last_updated: data.last_updated,
      ttl: data.ttl,
    })
  );

  // 4️⃣ Save stations into Valkey
  await loadStationStatusIntoValkey(data.data.stations);

  console.log(`❇️ Station Status data refreshed from API`);
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
