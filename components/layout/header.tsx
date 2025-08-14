import { IconSun } from '../icons';
import { UserAvatar } from '../user-avatar';

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <h1 className="text-2xl font-bold">
        <IconSun className="text-yellow-600" />
      </h1>
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <a href="#" className="hover:underline">
              Stations
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <UserAvatar />
          </li>
        </ul>
      </nav>
    </header>
  );
}
