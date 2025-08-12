import { auth, signIn as signIN, signOut as signOUT } from '@/lib/auth/auth';

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function signIn() {
  'use server';
  return signIN('github', { redirectTo: '/dashboard' });
}

export async function signOut() {
  'use server';
  return signOUT();
}
