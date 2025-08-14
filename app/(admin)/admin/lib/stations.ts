import { redis } from '@/lib/redis';
import { Station, StationInformation } from '@/types';

export async function loadStations() {
  'use server';
  return fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
    .then((response) => response.json())
    .then((data: StationInformation) => {
      loadStationInformationIntoUpstash(data.data.stations);
    })
    .catch((error) => {
      console.error('Error loading stations:', error);
    });
}

function loadStationInformationIntoUpstash(stations: Station[]) {
  stations.forEach(async (station) => {
    // Example: Save each station to Upstash Redis
    // This is a placeholder; replace with actual Upstash Redis logic
    await redis.geoadd('locations', {
      longitude: station.lon,
      latitude: station.lat,
      member: station.station_id,
    });

    await redis.hset('locationsdetail', {
      [station.station_id]: JSON.stringify(station),
    });

    console.log('Saving station to Upstash:', station.name);
  });
}
