'use server';

import { getRedis } from '@/lib/redis';
import { StationType } from '@/types';

export async function getStationById(stationId: string): Promise<StationType> {
  const redis = await getRedis();
  const stationJson = await redis.hget('locationsdetail', stationId);
  const station =
    typeof stationJson === 'string' ? JSON.parse(stationJson) : stationJson;

  const stationStatusJson = await redis.hget('station_status', stationId);
  const stationStatus =
    typeof stationStatusJson === 'string'
      ? JSON.parse(stationStatusJson)
      : stationStatusJson;

  if (!station || !stationStatus) {
    throw new Error('Station not found');
  }

  return {
    id: stationId,
    name: station.name,
    orig_name: station.name as string,
    coordinates: { lat: station.lat as number, lon: station.lon as number },
    num_docks_available: stationStatus.num_docks_available as number,
    bikes:
      (stationStatus.num_bikes_available as number) -
      (stationStatus.num_ebikes_available as number),
    ebikes: stationStatus.num_ebikes_available as number,
  };
}

export async function loadNearbyStations(
  lat: number,
  lon: number
): Promise<StationType[]> {
  const redis = await getRedis();
  const rawResults = await redis.geosearch(
    'locations',
    'FROMLONLAT',
    lon,
    lat,
    'BYRADIUS',
    0.5, // radius value
    'KM', // radius unit
    'ASC',
    'WITHCOORD',
    'WITHDIST'
  );

  type Result = {
    member: string;
    dist: number;
    coord: { lon: number; lat: number };
  };
  const results: Result[] = [];
  for (let i = 0; i < rawResults.length; i++) {
    const [member, dist, coords] = rawResults[i] as [
      string,
      string,
      [string, string]
    ];
    results.push({
      member,
      dist: parseFloat(dist),
      coord: {
        lon: parseFloat(coords[0]),
        lat: parseFloat(coords[1]),
      },
    });
  }

  // Now results is an array of objects
  const stations = await Promise.all(
    results.map(async (r) => {
      const stationJson = await redis.hget(
        'locationsdetail',
        r.member as string
      );
      const station =
        typeof stationJson === 'string' ? JSON.parse(stationJson) : stationJson;

      const stationStatusJson = await redis.hget(
        'station_status',
        r.member as string
      );
      const stationStatus =
        typeof stationStatusJson === 'string'
          ? JSON.parse(stationStatusJson)
          : stationStatusJson;

      return {
        id: r.member,
        name: station.name,
        orig_name: station.name as string,
        coordinates: r.coord,
        num_docks_available: stationStatus.num_docks_available,
        bikes:
          stationStatus.num_bikes_available -
          stationStatus.num_ebikes_available,
        ebikes: stationStatus.num_ebikes_available,
      };
    })
  );

  return stations.filter(Boolean);
}
