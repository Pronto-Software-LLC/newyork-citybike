import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
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
  label,
  labelMap,
}) => {
  const handleClick = () => {
    // Apple Maps URL scheme
    // dirflg=b is for biking directions
    // dirflg=w is for walking directions
    const url =
      `https://maps.apple.com/?sll=${latitude},${longitude}&t=r&z=5` +
      (labelMap ? `&daddr=${encodeURIComponent(labelMap)}&dirflg=b` : '');
    window.open(url, '_blank');
  };

  return (
    <Button variant="secondary" onClick={handleClick}>
      <Send /> Map
    </Button>
  );
};
