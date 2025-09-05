'use client';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from './lib/favorites';
import { FavStation } from './components/fav-station';

export default function Favorites() {
  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => {
      return getFavorites();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="p-4 rounded shadow">
      <div className="flex flex-col gap-6">
        {favorites?.map((station) =>
          station.id && station.name ? (
            <FavStation key={station.id} station={station} />
          ) : null
        )}
      </div>
    </div>
  );
}
