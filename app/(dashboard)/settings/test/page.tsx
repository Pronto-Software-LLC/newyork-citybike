'use client';

import { th } from 'date-fns/locale';
import { createContext, useEffect, useState } from 'react';

enum LocStatus {
  Waiting = 'Waiting for location...',
  Error = 'Error processing location.',
  Updated = 'Location updated, sending to server...',
  DataReceived = 'Data received from server.',
  NotSupported = 'Geolocation is not supported.',
}

export default function LocationWatcher({ mapToUse }: { mapToUse: string }) {
  const [status, setStatus] = useState<LocStatus>(LocStatus.Waiting);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [theLat, setTheLat] = useState(0);
  const [theLon, setTheLon] = useState(0);
  const [theSpeed, setTheSpeed] = useState(0);

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

        try {
          setStatus(LocStatus.DataReceived);
          setTheLat(latitude);
          setTheLon(longitude);
          setTheSpeed(speed || 0);
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

  return (
    <div className="p-4 rounded shadow">
      {/* <p>Status: {status}</p> */}
      <div className="flex flex-col gap-6">
        <div>{theLat}</div>
        <div>{theLon}</div>
        <div>{theSpeed}</div>
      </div>
    </div>
  );
}
