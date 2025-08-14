'use server';

import { bearings, calculateDistance } from '@/lib/distance';
import { redis } from '@/lib/redis';

export async function loadNearbyStations(lat: number, lon: number) {
  const rawResults = await redis.geosearch(
    'locations',
    'FROMLONLAT',
    lon,
    lat,
    'BYRADIUS',
    1, // radius value
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
        time: new Date().toISOString(),
        distance: r.dist,
        distanceFormatted: calculateDistance(
          lat,
          lon,
          r?.coord?.lat,
          r?.coord?.lon
        ),
        bearings: bearings(lat, lon, r?.coord?.lat, r?.coord?.lon),
        // Add coordinates to the station object
        coordinates: r.coord,
        ...station,
        ...stationStatus,
      };
    })
  );

  return stations.filter(Boolean);
}
