import { createAuthClient } from 'better-auth/client'
import {
  inferAdditionalFields,
  usernameClient,
} from 'better-auth/client/plugins'
import type { auth } from './auth.ts'

export const client = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [inferAdditionalFields<typeof auth>(), usernameClient()],
})

export const { signUp, signIn, signOut, useSession } = client
