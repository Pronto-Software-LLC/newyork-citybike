import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'New York City Bike',
  description: 'Easy access to CitiBike stall locations and availability',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
