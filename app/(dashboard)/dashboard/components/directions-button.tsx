import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import React, { useContext } from 'react';
import { MapToUseContext } from './location-watcher';

interface AppleMapsButtonProps {
  latitude: number;
  longitude: number;
}

export const DirectionsButton: React.FC<AppleMapsButtonProps> = ({
  latitude,
  longitude,
}) => {
  const mapToUse = useContext(MapToUseContext);

  const handleClick = () => {
    let url = '';
    if (mapToUse === 'apple') {
      url = `https://maps.apple.com/directions?destination=${latitude},${longitude}&mode=cycling&start=2`;
      window.open(url, '_blank');
      return;
    }

    if (mapToUse === 'google') {
      // Google Maps URL scheme
      url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=bicycling&dir_action=navigate `;
      window.open(url, '_blank');
      return;
    }
  };

  return (
    <Button variant="secondary" onClick={handleClick}>
      <Send /> Map
    </Button>
  );
};
