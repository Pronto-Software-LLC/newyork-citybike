'use client';

import { createContext, useEffect, useState } from 'react';
import { loadNearbyStations } from '../lib/stations';
import { Station } from './station';
import { loadStationsStatus } from '@/lib/stations-status';
import { loadStations } from '@/lib/stations';
import { Skeleton } from '@/components/ui/skeleton';

export const MapToUseContext = createContext('');

interface StationType {
  id: string;
  name: string;
  orig_name: string;
  distance: number;
  coordinates: { lon: number; lat: number };
  distanceFormatted: string;
  num_docks_available: number;
  bikes: number;
  ebikes: number;
}

enum LocStatus {
  Waiting = 'Waiting for location...',
  Error = 'Error processing location.',
  Updated = 'Location updated, sending to server...',
  DataReceived = 'Data received from server.',
  NotSupported = 'Geolocation is not supported.',
}

export default function LocationWatcher({ mapToUse }: { mapToUse: string }) {
  const [status, setStatus] = useState<LocStatus>(LocStatus.Waiting);
  const [locationData, setLocationData] = useState<StationType[]>([]);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus(LocStatus.NotSupported);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const now = Date.now();
        if (now - lastUpdate < 5000) {
          return;
        }
        setLastUpdate(now);

        setStatus(LocStatus.Updated);
        const { latitude, longitude, speed } = position.coords;
        console.log('🚀 ~ LocationWatcher ~ speed:', speed);

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
      },
      (error) => {
        console.error(error);
        // setStatus(`Error: ${error.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [lastUpdate]);

  if (status === LocStatus.NotSupported) {
    return (
      <div className="p-4 rounded shadow">
        Geolocation is not supported by your browser.
      </div>
    );
  }
  //bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm
  if (locationData.length === 0) {
    return (
      <div className="p-4 rounded shadow">
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
      <MapToUseContext value={mapToUse}>
        {/* <p>Status: {status}</p> */}
        <div className="flex flex-col gap-6">
          {locationData &&
            locationData.map((station) => (
              <Station station={station} key={station.id} />
            ))}
        </div>
      </MapToUseContext>
    </div>
  );
}
