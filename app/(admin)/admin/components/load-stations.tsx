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
import { loadStations } from '../lib/stations';

export function LoadStations() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Load stations from CitiBike</CardTitle>
        <CardDescription>
          Read the stations from CitiBike API and load them in upstash REDIS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Details about the station...</p>
        <Button className="mt-4" onClick={loadStations}>
          Load
        </Button>
      </CardContent>
    </Card>
  );
}
