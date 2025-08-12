import { auth, signIn, signOut } from '@/lib/auth/auth';
import Image from 'next/image';
import { Button } from './ui/button';
export async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return (
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}>
        <Button type="submit">Sign in</Button>
      </form>
    );
  }

  return (
    <div className="flex items-center">
      <Image
        width={32}
        height={32}
        src={session.user.image}
        className="h-8 w-8 rounded-full"
        alt={session.user.name}
      />
      <form
        action={async () => {
          'use server';
          await signOut();
        }}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
