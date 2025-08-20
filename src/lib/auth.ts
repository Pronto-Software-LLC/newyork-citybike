import { username } from 'better-auth/plugins'
import { betterAuth } from 'better-auth'
import { reactStartCookies } from 'better-auth/react-start'
import { db } from './db'

export const auth = betterAuth({
  database: {
    db,
    type: 'postgres',
  },
  appName: '.',
  plugins: [username(), reactStartCookies()],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
})
