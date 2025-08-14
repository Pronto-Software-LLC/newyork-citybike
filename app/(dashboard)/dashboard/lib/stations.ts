'use server';

import { bearings, calculateDistance } from '@/lib/distance';
import { redis } from '@/lib/redis';

export async function loadNearbyStations(lat: number, lon: number) {
  const results = await redis.geosearch(
    'locations',
    {
      type: 'FROMLONLAT',
      coordinate: {
        lon,
        lat,
      },
    },
    {
      type: 'BYRADIUS',
      radius: 1, // 1 km radius
      radiusType: 'KM',
    },
    'ASC',
    {
      withCoord: true,
      withDist: true,
    }
  );

  // Now results is an array of objects
  const stations = await Promise.all(
    results.map(async (r) => {
      const stationJson = await redis.hget(
        'locationsdetail',
        r.member as string
      );
      const station =
        typeof stationJson === 'string' ? JSON.parse(stationJson) : stationJson;

      return {
        id: r.member,
        time: new Date().toISOString(),
        distance: r.dist,
        distanceFormatted: calculateDistance(
          lat,
          lon,
          r?.coord?.lat,
          r?.coord?.long
        ),
        bearings: bearings(lat, lon, r?.coord?.lat, r?.coord?.long),
        // Add coordinates to the station object
        coordinates: r.coord,
        ...station,
      };
    })
  );

  return stations.filter(Boolean);
}
