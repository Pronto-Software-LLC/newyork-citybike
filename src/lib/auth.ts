import { username } from 'better-auth/plugins'
import { betterAuth } from 'better-auth'
import { reactStartCookies } from 'better-auth/react-start'
import { getHeaders } from '@tanstack/react-start/server'
import { createMiddleware } from '@tanstack/react-start'

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

export const serverSession = async () => {
  const headers = new Headers(
    Object.entries(getHeaders()).map(([key, value]) => [key, value ?? '']),
  )
  return await auth.api.getSession({ headers })
}

export const loggingMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next, data }) => {
    console.log('Request received:', data)
    const result = await next()
    console.log('Response processed:', result)
    return result
  },
)

export const apiMiddleware = createMiddleware({ type: 'function' })
  .middleware([loggingMiddleware])
  .server(async ({ next }) => {
    const session = await serverSession()
    if (!session) {
      return await new Response('Not authorized', {
        status: 401,
        statusText: 'Unauthorized',
      })
    }

    return await next({
      context: {
        session,
      },
    })
  })
