// import { auth, signIn, signOut } from '@/lib/auth/auth';
import { getCurrentUser, signIn, signOut } from '@/lib/session';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {
  ClipboardClock,
  House,
  LogOut,
  Settings,
  Star,
  UserRound,
} from 'lucide-react';

function initials(name: string | null | undefined): string {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
}

export async function UserAvatar() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <form action={signIn}>
        <Button type="submit">Sign in</Button>
      </form>
    );
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.image || '#'} />
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center gap-2">
            <UserRound />
            {user.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/" className="flex items-center gap-2">
              <House />
              homepage
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/favorites" className="flex items-center gap-2">
              <Star /> Favorites
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/history" className="flex items-center gap-2">
              <ClipboardClock />
              History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings" className="flex items-center gap-2">
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={signOut}>
              <Button variant="ghost" type="submit">
                <LogOut />
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
