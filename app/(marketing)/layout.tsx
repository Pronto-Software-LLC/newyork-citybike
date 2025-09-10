import Logo from '@/components/layout/logo';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';
import { UserAvatar } from '@/components/user-avatar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Logo />
            <span className="ml-2">CitiBike Buddy</span>
          </h1>
        </Link>

        <nav>
          <UserAvatar />
        </nav>
      </header>
      {children}
      <Footer />
    </>
  );
}
