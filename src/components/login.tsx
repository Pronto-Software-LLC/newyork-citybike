import { Link } from '@tanstack/react-router'
// import { client } from '@/lib/auth-client' // import the auth client
import { createAuthClient } from 'better-auth/react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/Button'
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from './ui/Menu'
// import { MenuTrigger } from 'react-aria-components'

const authCLient = createAuthClient()

const { useSession } = authCLient

export default function Login() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession()
  if (session) {
    return (
      // <div className="flex gap-2">
      //   {session.user.name}
      //   <img
      //     className="w-10 h-10 rounded-full object-cover border-4 border-indigo-300"
      //     src={session.user.image || ''}
      //   />
      //   <Button onPress={() => authCLient.signOut()}>Sign Out</Button>
      // </div>

      <MenuTrigger>
        <Button className="px-2" variant="icon">
          <img
            className="w-10 h-10 rounded-full object-cover border-4 border-indigo-300"
            src={session.user.image || ''}
          />
        </Button>
        <Menu>
          <MenuItem id="new">New…</MenuItem>
          <MenuItem id="open">Open…</MenuItem>
          <MenuSeparator />
          <MenuItem id="save">Save</MenuItem>
          <MenuItem id="saveAs">Save as…</MenuItem>
          <MenuSeparator />
          <MenuItem id="print" onClick={() => authCLient.signOut()}>
            Logout
          </MenuItem>
        </Menu>
      </MenuTrigger>
    )
  }

  return (
    <>
      <Button
        onPress={() =>
          authCLient.signIn.social({ provider: 'github', callbackURL: '/' })
        }
      >
        Sign In
      </Button>
    </>
  )
}
