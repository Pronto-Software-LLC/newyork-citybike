import { getCurrentUser } from '@/lib/session';

export default async function Favorites() {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      Favorites page for {user?.name}
    </div>
  );
}
