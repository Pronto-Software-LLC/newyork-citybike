'use client';

import { useEffect, useState } from 'react';
import { loadNearbyStations } from '../lib/stations';
import { Station } from './station';

export default function LocationWatcher() {
  const [status, setStatus] = useState('Waiting for location...');
  const [locationData, setLocationData] = useState<unknown>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('Geolocation is not supported.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        setStatus('Location updated, sending to server...');
        const { latitude, longitude } = position.coords;

        try {
          const data = await loadNearbyStations(latitude, longitude);
          setLocationData(data);
          setStatus('Data received from server.');
        } catch (err) {
          console.error(err);
          setStatus('Error processing location.');
        }
      },
      (error) => {
        console.error(error);
        setStatus(`Error: ${error.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

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
