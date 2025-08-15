import { Button } from '@/components/ui/button';
import React from 'react';

interface AppleMapsButtonProps {
  latitude: number;
  longitude: number;
  label?: string;
  labelMap?: string;
}

export const DirectionsButton: React.FC<AppleMapsButtonProps> = ({
  latitude,
  longitude,
  label = 'Open in Apple Maps',
  labelMap,
}) => {
  const handleClick = () => {
    // Apple Maps URL scheme
    const url =
      `https://maps.apple.com/?sll=${latitude},${longitude}?t=r` +
      (labelMap ? `&q=${labelMap}` : '');
    window.open(url, '_blank');
  };

  return <Button onClick={handleClick}>{label}</Button>;
};
