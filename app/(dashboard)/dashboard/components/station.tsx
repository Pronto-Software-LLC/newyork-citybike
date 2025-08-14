'use client';

import { Card } from '@/components/ui/card';

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
      <pre>{JSON.stringify(station, null, 2)}</pre>
    </Card>
  );
}
