import NextAuth from 'next-auth';
import { XataAdapter } from '@auth/xata-adapter';
import GitHub from 'next-auth/providers/github';
import { XataClient } from '@/lib/xata'; // Or wherever you've chosen for the generated client

const client = new XataClient({});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: XataAdapter(client),
  providers: [GitHub],
  callbacks: {
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
