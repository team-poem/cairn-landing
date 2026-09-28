import type { Viewport } from 'next';
import { metadataFor } from '@/lib/metadata';
import { LandingDocument } from '@/components/landing/LandingDocument';

export const metadata = metadataFor('en');
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1019',
  colorScheme: 'dark',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <LandingDocument locale="en">{children}</LandingDocument>;
}
