import { createAuthClient } from 'better-auth/react'
// import {
//   inferAdditionalFields,
//   usernameClient,
// } from 'better-auth/client/plugins'
// import type { auth } from './auth.ts'

export const client = createAuthClient()

export const { signUp, signIn, signOut, useSession } = client

export const useUser = () => {
  const { data, isPending } = useSession()
  const user = data?.user
  return {
    user,
    isPending,
  }
}
