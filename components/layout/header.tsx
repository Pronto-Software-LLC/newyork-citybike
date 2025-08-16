import Link from 'next/link';
import { UserAvatar } from '../user-avatar';
import Logo from './logo';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <Link href="/" className="flex items-center">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Logo />
          <span className="ml-2">NYC Bike Info</span>
        </h1>
      </Link>
      <nav>
        <UserAvatar />
      </nav>
    </header>
  );
}
