'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TimeAgo from 'react-timeago';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { LiveStationsProps } from '@/types';
import StationDistance from '../../dashboard/components/station-distance';
import { SaveToFavorites } from '../../dashboard/components/save-to-favorites';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromHistory } from '../lib/history';

export function HistStation({ station }: LiveStationsProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteFromHistory } = useMutation({
    mutationFn: async () => await removeFromHistory(station.id),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['history'],
      });
    },
  });

  return (
    <Card key={station.id}>
      <CardHeader>
        <CardTitle>{station.name}</CardTitle>
        <CardDescription>
          <TimeAgo date={station.updatedAt as string} />
        </CardDescription>
        <CardAction className="text-2xl">
          <StationDistance {...station.coordinates} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <Button variant="destructive" onClick={() => deleteFromHistory()}>
            <div className="flex items-center gap-2">
              <Trash2 width={80} height={80} />
              delete
            </div>
          </Button>
          <SaveToFavorites station={station} />
        </div>
      </CardContent>
    </Card>
  );
}
