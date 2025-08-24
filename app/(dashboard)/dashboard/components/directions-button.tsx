import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import React, { useContext } from 'react';
import { MapToUseContext } from './location-watcher';

interface AppleMapsButtonProps {
  latitude: number;
  longitude: number;
  label?: string;
  labelMap?: string;
}

export const DirectionsButton: React.FC<AppleMapsButtonProps> = ({
  latitude,
  longitude,
  label,
  labelMap,
}) => {
  const mapToUse = useContext(MapToUseContext);

  const handleClick = () => {
    // Apple Maps URL scheme
    // dirflg=b is for biking directions
    // dirflg=w is for walking directions
    let url = '';
    if (mapToUse === 'apple') {
      url =
        `https://maps.apple.com/?sll=${latitude},${longitude}&t=r&z=5` +
        (labelMap ? `&daddr=${encodeURIComponent(labelMap)}` : '');
      window.open(url, '_blank');
      return;
    }

    // Google Maps URL scheme
    //https://www.google.com/maps/dir/?api=1&parameters

    url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=bicycling&dir_action=navigate `;
    // (labelMap ? `&destination_place_id=${encodeURIComponent(labelMap)}` : '');
    window.open(url, '_blank');
  };

  return (
    <Button variant="secondary" onClick={handleClick}>
      <Send /> Map
    </Button>
  );
};
