import { useLocation } from '@/components/location-provider';
import { calculateDistance } from '@/lib/distance';
import React from 'react';
import { Coordinates } from '@/types';

const StationDistance = (coordinates: Coordinates) => {
  const { latitude, longitude } = useLocation();
  const { lat, lon } = coordinates;

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return <></>;
  }
  if (lat === null || lon === null) {
    return <></>;
  }

  const distance = calculateDistance(latitude || 0, longitude || 0, lat, lon);

  return <span>{distance}</span>;
};

export default StationDistance;
