import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      unauthenticated page
    </div>
  );
}
