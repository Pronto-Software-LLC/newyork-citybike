import { UserAvatar } from '../user-avatar';
import Logo from './logo';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <h1 className="text-2xl font-bold flex items-center gap-3">
        <Logo />
        <span className="ml-2">NYC Bike Info</span>
      </h1>
      <nav>
        <ul className="flex items-center gap-2">
          {/* <li>
            <a href="#" className="hover:underline">
              Stations
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li> */}
          <li>
            <UserAvatar />
          </li>
        </ul>
      </nav>
    </header>
  );
}
