'use client';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from './lib/favorites';

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
    <div className="flex min-h-screen flex-col items-center justify-center">
      {favorites?.map((station) => (
        <div key={station.id}>{station.name}</div>
      ))}
    </div>
  );
}
