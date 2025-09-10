'use client';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from './lib/favorites';
import { FavStation } from './components/fav-station';
// import { SortBy } from './components/sorty-by';

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

  if (!favorites || favorites.length === 0) {
    return <div className="p-4 rounded shadow">No favorites yet.</div>;
  }

  return (
    <div className="p-4 rounded shadow">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold mb-4 ">Favorites</h1>
        {/* <SortBy /> */}
      </div>
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
