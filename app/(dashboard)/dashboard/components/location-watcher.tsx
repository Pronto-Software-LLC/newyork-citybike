'use client';

import { useEffect, useState } from 'react';
import { loadNearbyStations } from '../lib/stations';
import { Station } from './station';
import { loadStationsStatus } from '@/app/(admin)/admin/lib/stations-status';
import { loadStations } from '@/app/(admin)/admin/lib/stations';
import { Skeleton } from '@/components/ui/skeleton';

interface StationType {
  id: string;
  name: string;
  distance: number;
  coordinates: [number, number];
  distanceFormatted: string;
  num_docks_available: number;
}

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
        const { latitude, longitude } = position.coords;

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

  if (status === LocStatus.Error) {
    return (
      <div className="p-4 rounded shadow">Error retrieving location data.</div>
    );
  }

  if (status === LocStatus.Waiting) {
    return (
      <div className="p-4 rounded shadow">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    );
  }

  if (locationData.length === 0) {
    return <div className="p-4 rounded shadow">No stations found nearby.</div>;
  }

  if (status === LocStatus.Updated) {
    return (
      <div className="p-4 rounded shadow">
        Location updated, fetching nearby stations...
      </div>
    );
  }

  return (
    <div className="p-4 rounded shadow">
      <h2>Location Tracker</h2>
      <p>Status: {status}</p>
      <div className="flex flex-col gap-6">
        {locationData &&
          locationData.map((station) => (
            <Station station={station} key={station.id} />
          ))}
      </div>
    </div>
  );
}
