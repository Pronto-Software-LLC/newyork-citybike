'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DirectionsButton } from './directions-button';
import { Button } from '@/components/ui/button';
import { BatteryCharging, Bike, CircleParking } from 'lucide-react';
import { SaveToFavorites } from './save-to-favorites';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '../../favorites/lib/favorites';
import { RemoveFromFavorites } from './remove-from-favorites';

import StationDistance from './station-distance';

export interface Coordinates {
  lat: number;
  lon: number;
}

interface LiveStationsProps {
  station: {
    id: string;
    name: string;
    orig_name: string;
    distance: number;
    coordinates: Coordinates;
    distanceFormatted: string;
    num_docks_available: number;
    bikes: number;
    ebikes: number;
  };
}

export function Station({ station }: LiveStationsProps) {
  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => {
      return getFavorites();
    },
  });

  const fav = favorites?.find((favorite) => favorite.id === station.id);
  if (fav) {
    station.name = fav?.name ?? station.name;
  } else {
    station.name = station.orig_name;
  }

  return (
    <Card key={station.id}>
      <CardHeader>
        <CardTitle>{fav?.name ?? station.name}</CardTitle>
        <CardDescription>
          {fav ? (
            <RemoveFromFavorites station={station}>
              {station.orig_name}
            </RemoveFromFavorites>
          ) : (
            <SaveToFavorites station={station} />
          )}
        </CardDescription>
        <CardAction className="text-2xl">
          <StationDistance {...station.coordinates} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button
            variant={
              station.num_docks_available > 0 ? 'outline' : 'destructive'
            }>
            <div className="flex items-center gap-2">
              <CircleParking width={80} height={80} />{' '}
              {station.num_docks_available}
            </div>
          </Button>
          <Button variant={station.bikes > 0 ? 'outline' : 'destructive'}>
            <div className="flex items-center gap-2">
              <Bike width={80} height={80} /> <span>{station.bikes}</span>
            </div>
          </Button>
          <Button variant={station.ebikes > 0 ? 'outline' : 'destructive'}>
            <div className="flex items-center gap-2">
              <BatteryCharging width={80} height={80} /> {station.ebikes}
            </div>
          </Button>
          <DirectionsButton
            latitude={station.coordinates.lat}
            longitude={station.coordinates.lon}
          />
        </div>
      </CardContent>
    </Card>
  );
}
