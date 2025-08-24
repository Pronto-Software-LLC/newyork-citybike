import { loadSettings } from '../settings/lib/save-settings';
import LocationWatcher from './components/location-watcher';

export default async function Home() {
  const mapToUse = await loadSettings();
  return (
    <main>
      <LocationWatcher mapToUse={mapToUse ?? 'apple'} />
    </main>
  );
}
