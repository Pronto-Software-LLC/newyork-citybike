import { Button } from '@/components/ui/button';
import React from 'react';

interface AppleMapsButtonProps {
  latitude: number;
  longitude: number;
  label?: string;
}

export const DirectionsButton: React.FC<AppleMapsButtonProps> = ({
  latitude,
  longitude,
  label = 'Open in Apple Maps',
}) => {
  const handleClick = () => {
    // Apple Maps URL scheme
    const url = `https://maps.apple.com/?ll=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return <Button onClick={handleClick}>{label}</Button>;
};
