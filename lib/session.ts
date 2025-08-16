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

export type Session = {
  sessionToken: string;
};

export async function getSessionId(): Promise<string | null> {
  const session = await auth();
  return (session as Session | null)?.sessionToken ?? null;
}

export async function getCurrentUser(): Promise<UserWithAdmin | null> {
  const session = await auth();
  return session?.user ?? null;
}

export async function signIn() {
  'use server';
  return signIN(undefined, { redirectTo: '/dashboard' });
}

export async function signOut() {
  'use server';
  return signOUT({ redirectTo: '/' });
}
