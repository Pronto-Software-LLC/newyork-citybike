'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LiveStationsProps {
  station: {
    id: string;
    name: string;
    distance: number;
    coordinates: [number, number];
  };
}

export function Station({ station }: LiveStationsProps) {
  return (
    <Card key={station.id}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <pre>{JSON.stringify(station, null, 2)}</pre>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
