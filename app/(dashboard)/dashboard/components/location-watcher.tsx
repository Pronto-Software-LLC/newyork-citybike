'use client';

import { createContext, useEffect, useState } from 'react';
import { loadNearbyStations } from '../lib/stations';
import { Station } from './station';
import { loadStationsStatus } from '@/lib/stations-status';
import { loadStations } from '@/lib/stations';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocation } from '@/components/location-provider';
import { StationType } from '@/types';

// export const MapToUseContext = createContext('');

// interface StationType {
//   id: string;
//   name: string;
//   orig_name: string;
//   distance: number;
//   coordinates: { lon: number; lat: number };
//   distanceFormatted: string;
//   num_docks_available: number;
//   bikes: number;
//   ebikes: number;
// }

enum LocStatus {
  Waiting = 'Waiting for location...',
  Error = 'Error processing location.',
  Updated = 'Location updated, sending to server...',
  DataReceived = 'Data received from server.',
  NotSupported = 'Geolocation is not supported.',
}

export default function LocationWatcher() {
  const [status, setStatus] = useState<LocStatus>(LocStatus.Waiting);
  const [locationData, setLocationData] = useState<StationType[]>([]);
  const { latitude, longitude } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (typeof latitude === 'number' && typeof longitude === 'number') {
        setStatus(LocStatus.Updated);
        try {
          await loadStations();
          await loadStationsStatus();
          const data = await loadNearbyStations(latitude, longitude);
          setLocationData(data);
          setStatus(LocStatus.DataReceived);
        } catch (err) {
          console.error(err);
          setStatus(LocStatus.Error);
        }
      } else if (latitude === null || longitude === null) {
        setStatus(LocStatus.Waiting);
      }
    };
    fetchData();
  }, [latitude, longitude]);

  if (status === LocStatus.NotSupported) {
    return (
      <div className="p-4 rounded shadow">
        Geolocation is not supported by your browser.
      </div>
    );
  }
  if (locationData.length === 0) {
    return (
      <div className="p-4 rounded shadow">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold mb-4 ">Loading nearby stations</h1>
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-[125px]  rounded-xl  border py-6 shadow-sm" />
          <Skeleton className="h-[125px]  rounded-xl  border py-6 shadow-sm" />
          <Skeleton className="h-[125px]  rounded-xl  border py-6 shadow-sm" />
          <Skeleton className="h-[125px]  rounded-xl  border py-6 shadow-sm" />
          <Skeleton className="h-[125px]  rounded-xl  border py-6 shadow-sm" />
          <Skeleton className="h-[125px]  rounded-xl  border py-6 shadow-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded shadow">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold mb-4 ">Nearby</h1>
      </div>
      <div className="flex flex-col gap-6">
        {locationData &&
          locationData.map((station) => (
            <Station station={station} key={station.id} />
          ))}
      </div>
    </div>
  );
}
