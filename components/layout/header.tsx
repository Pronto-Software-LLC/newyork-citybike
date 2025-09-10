import Link from 'next/link';
import { UserAvatar } from '../user-avatar';
import Logo from './logo';
import { ClipboardClock, Star } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <Link href="/" className="flex items-center">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Logo />
          <span className="ml-2">CitiBike Buddy</span>
        </h1>
      </Link>
      <Link href="/favorites" className="flex items-center">
        <Star fill="currentColor" />
      </Link>{' '}
      <Link href="/history" className="flex items-center">
        <ClipboardClock />
      </Link>
      <nav>
        <UserAvatar />
      </nav>
    </header>
  );
}
