import { Button } from '@/components/ui/button';
import { Milestone } from 'lucide-react';
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
    const url =
      `https://maps.apple.com/?sll=${latitude},${longitude}?t=r?dirflg=w&z=5` +
      (labelMap ? `&q=${encodeURIComponent(labelMap)}` : '');
    window.open(url, '_blank');
  };

  return <Button onClick={handleClick}>{label ? label : <Milestone />}</Button>;
};
