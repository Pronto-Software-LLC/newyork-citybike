'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DirectionsButton } from '@/app/(dashboard)/dashboard/components/directions-button';
import { Button } from '@/components/ui/button';
import { CircleParking } from 'lucide-react';
import { RemoveFromFavorites } from '../../dashboard/components/remove-from-favorites';
import { LiveStationsProps } from '@/types';
import StationDistance from '../../dashboard/components/station-distance';

export function FavStation({ station }: LiveStationsProps) {
  return (
    <Card key={station.id}>
      <CardHeader>
        <CardTitle>{station.name}</CardTitle>
        <CardDescription>
          <RemoveFromFavorites station={station}>
            {station.orig_name}
          </RemoveFromFavorites>
        </CardDescription>
        <CardAction className="text-2xl">
          <StationDistance {...station.coordinates} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <Button
            variant={
              station.num_docks_available > 0 ? 'outline' : 'destructive'
            }>
            <div className="flex items-center gap-2">
              <CircleParking width={80} height={80} />
              {station.num_docks_available}
            </div>
          </Button>
          <DirectionsButton station={station} />
        </div>
      </CardContent>
    </Card>
  );
}
