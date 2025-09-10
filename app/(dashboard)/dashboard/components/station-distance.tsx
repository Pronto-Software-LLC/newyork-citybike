import { useLocation } from '@/components/location-provider';
import {
  calculateDistance,
  formatDistanceImperial,
  formatDistanceMetric,
} from '@/lib/distance';
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
  const feetDistance = formatDistanceImperial(distance as number);
  const metricDistance = formatDistanceMetric(distance as number);
  return (
    <div className="flex flex-col items-end">
      {feetDistance}
      <div className="text-sm text-muted-foreground">{metricDistance}</div>
    </div>
  );
};

export default StationDistance;
