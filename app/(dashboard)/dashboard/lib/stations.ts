'use server';

import { bearings, calculateDistance } from '@/lib/distance';
import { getRedis } from '@/lib/redis';

export async function loadNearbyStations(lat: number, lon: number) {
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
      // if (station.is_installed + station.is_renting !== 2) {
      //   return null;
      // }
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
        bikes:
          stationStatus.num_bikes_available -
          stationStatus.num_ebikes_available,
        ebikes: stationStatus.num_ebikes_available,
        // Merge station and status data
        ...station,
        ...stationStatus,
      };
    })
  );

  console.log('🚀 ~ loadNearbyStations ~ stations:', stations);
  return stations.filter(Boolean);
}

// // const redis = await getRedis();
//   //load mapToUse in redis
//   let mapToUseValkey = '';
//   try {
//     // mapToUseValkey = (await redis.hget('mapToUse', user.id)) || '';
//   } catch (error) {
//     console.log('🚀 ~ error:', error);
//   }
//   // console.log('🚀 ~ mapToUseValkey:', mapToUseValkey);

//   const data = await client.db.nextauth_users
//     .select(['mapsToUse'])
//     .filter('id', user.id)
//     .getMany();
//   // await redis.hset('mapToUse', [user.id, data[0]['mapsToUse']]);
//   console.log('🚀 ~ data:', mapToUseValkey, data[0]['mapsToUse']);
