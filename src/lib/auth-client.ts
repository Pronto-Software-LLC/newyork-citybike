import { createAuthClient } from 'better-auth/react'

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
