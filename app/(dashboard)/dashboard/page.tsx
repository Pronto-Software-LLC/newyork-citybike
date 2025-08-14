import LocationWatcher from './components/location-watcher';

export default async function Home() {
  return (
    <main>
      <h1>Live Location Tracker</h1>
      <LocationWatcher />
    </main>
  );
}
