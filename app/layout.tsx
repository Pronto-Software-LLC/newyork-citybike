import './globals.css';
import { siteMetadata, siteViewport } from '@/config/site';
import Providers from './providers';

export const metadata = {
  ...siteMetadata,
};

export const viewport = {
  ...siteViewport,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
