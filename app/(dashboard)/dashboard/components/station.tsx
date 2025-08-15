'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DialogHeader } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DirectionsButton } from './directions-button';

interface LiveStationsProps {
  station: {
    id: string;
    name: string;
    distance: number;
    coordinates: [number, number];
    distanceFormatted: string;
    num_docks_available: number;
  };
}

export function Station({ station }: LiveStationsProps) {
  return (
    <Card key={station.id}>
      <CardHeader>
        <CardTitle>{station.name}</CardTitle>
        <CardDescription>docks available</CardDescription>
        <CardAction className="text-2xl">
          {station.distanceFormatted}
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <DirectionsButton
            latitude={station.coordinates[1]}
            longitude={station.coordinates[0]}
            labelMap={station.name}
          />
          <h1 className="text-2xl">{station.num_docks_available}</h1>
        </div>
      </CardContent>
      {/* Uncomment if you want to add a dialog for more details */}
      {/* <Dialog>
            <DialogTrigger>
              <Button>details</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>details</DialogTitle>
                <DialogDescription>
                  <ScrollArea className="h-[200px] min-w-screen rounded-md border p-4">
                    <pre>{JSON.stringify(station, null, 2)}</pre>
                  </ScrollArea>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}

      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
