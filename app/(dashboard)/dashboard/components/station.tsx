'use client';

// import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { DialogHeader } from '@/components/ui/dialog';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from '@/components/ui/dialog';
import { DirectionsButton } from './directions-button';
import { Button } from '@/components/ui/button';
import {
  BatteryCharging,
  Bike,
  // ChevronDown,
  CircleParking,
} from 'lucide-react';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

interface LiveStationsProps {
  station: {
    id: string;
    name: string;
    distance: number;
    coordinates: [number, number];
    distanceFormatted: string;
    num_docks_available: number;
    bikes: number;
    ebikes: number;
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
            latitude={station.coordinates[1]}
            longitude={station.coordinates[0]}
            labelMap={station.name}
          />
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
