import NextAuth from 'next-auth';
import { XataAdapter } from '@auth/xata-adapter';
import GitHub from 'next-auth/providers/github';
import { XataClient } from '@/lib/xata'; // Or wherever you've chosen for the generated client
import Google from 'next-auth/providers/google';

const client = new XataClient({});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: XataAdapter(client),
  providers: [GitHub, Google],
  callbacks: {
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
