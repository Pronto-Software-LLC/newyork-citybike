import NextAuth from 'next-auth';
import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import GitHub from 'next-auth/providers/github';
import { redis } from '../redis';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: UpstashRedisAdapter(redis),
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
