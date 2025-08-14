import { admins } from '@/config/site';
import { auth, signIn as signIN, signOut as signOUT } from '@/lib/auth/auth';

type UserWithAdmin = {
  isAdmin?: boolean | null;
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function getUserIdFromSession(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export async function getSessionId(): Promise<string | null> {
  const session = await auth();
  return session?.sessionToken ?? null;
}

export async function getCurrentUser(): Promise<UserWithAdmin | null> {
  const session = await auth();
  if (admins.includes(session?.user?.id)) {
    return {
      ...session?.user,
      isAdmin: true,
    };
  }
  return session?.user ?? null;
}

export async function signIn() {
  'use server';
  return signIN('github', { redirectTo: '/dashboard' });
}

export async function signOut() {
  'use server';
  return signOUT({ redirectTo: '/' });
}
