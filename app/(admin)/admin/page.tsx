import { LoadStations } from './components/load-stations';

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoadStations />
    </div>
  );
}
