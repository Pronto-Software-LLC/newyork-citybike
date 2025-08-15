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

interface LiveStationsProps {
  station: {
    id: string;
    name: string;
    distance: number;
    coordinates: [number, number];
    distanceFormatted: string;
  };
}

export function Station({ station }: LiveStationsProps) {
  return (
    <Card key={station.id}>
      <CardHeader>
        <CardTitle>{station.name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction className="text-2xl">
          {station.distanceFormatted}
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <Dialog>
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
        </Dialog>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
