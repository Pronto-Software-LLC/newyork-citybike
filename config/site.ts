import { SiteConfig } from '@/types';
import type { Viewport, Metadata } from 'next';

const siteConfig: SiteConfig = {
  name: 'New York City Bike',
  description: 'Easy access to CitiBike stall locations and availability',
  url: process.env.NEXTAUTH_URL as string,
  ogImage: `${process.env.NEXTAUTH_URL}/og.jpg`,
  links: {
    twitter: 'https://twitter.com/puzzino',
    github: 'https://github.com/angedell',
  },
};

export const siteMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'CitiBike',
    'New York City',
    'Bike Sharing',
    'Bicycle Rentals',
    'Cycling',
    'Urban Mobility',
    'Public Transportation',
    'Bike Stations',
    'Bike Availability',
  ],
  authors: [
    {
      name: 'angedell',
      url: 'https://github.com/angedell',
    },
  ],
  creator: 'angedell',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@angedell',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const siteViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const admins = [process.env.ADMIN_ID];
