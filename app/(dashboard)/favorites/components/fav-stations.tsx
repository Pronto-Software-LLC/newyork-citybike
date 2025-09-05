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
import { DirectionsButton } from '@/app/(dashboard)/dashboard/components/directions-button';
import { Button } from '@/components/ui/button';
import { BatteryCharging, Bike, CircleParking } from 'lucide-react';
// import { useQuery } from '@tanstack/react-query';
// import { getFavorites } from '../../favorites/lib/favorites';

interface FavStationsProps {
  station: {
    id: string | null | undefined;
    name: string | null | undefined;
  };
}

export function FavStation({ station }: FavStationsProps) {
  return (
    <Card key={station.id}>
      <CardHeader>
        <CardTitle>{station.name}</CardTitle>
        <CardDescription>
          remove from fav
          {/* <RemoveFromFavorites station={station} /> */}
        </CardDescription>
        <CardAction className="text-2xl">
          {/* {station.distanceFormatted} */}
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button
          // variant={
          //   station.num_docks_available > 0 ? 'outline' : 'destructive'
          // }
          >
            <div className="flex items-center gap-2">
              <CircleParking width={80} height={80} />{' '}
              {/* {station.num_docks_available} */}
            </div>
          </Button>
          <Button
          // variant={station.bikes > 0 ? 'outline' : 'destructive'}
          >
            <div className="flex items-center gap-2">
              <Bike width={80} height={80} />
              {/* <span>{station.bikes}</span> */}
            </div>
          </Button>
          <Button
          // variant={station.ebikes > 0 ? 'outline' : 'destructive'}
          >
            <div className="flex items-center gap-2">
              <BatteryCharging width={80} height={80} />
              {/* {station.ebikes} */}
            </div>
          </Button>
          {/* <DirectionsButton
            latitude={station.coordinates.lat}
            longitude={station.coordinates.lon}
          /> */}
        </div>
      </CardContent>
    </Card>
  );
}
