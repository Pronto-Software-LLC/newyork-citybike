import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import React, { useContext } from 'react';
import { MapToUseContext } from './location-watcher';
import { LiveStationsProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToHistory } from '../../history/lib/history';

export const DirectionsButton: React.FC<LiveStationsProps> = ({ station }) => {
  const mapToUse = useContext(MapToUseContext);
  const queryClient = useQueryClient();

  const { lat: latitude, lon: longitude } = station.coordinates;
  const { mutate } = useMutation({
    mutationFn: async () => {
      return addToHistory(station.id);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['history'],
      });
    },
  });

  const handleClick = () => {
    mutate();
    let url = '';
    if (mapToUse === 'apple') {
      // url = `https://maps.apple.com/directions?destination=${latitude},${longitude}&mode=cycling&start=2`;
      url = `https://maps.apple.com/directions?destination=${latitude},${longitude}&mode=cycling`;
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
