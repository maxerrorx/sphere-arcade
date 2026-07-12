import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import { SphereProvider } from '@/contexts/SphereContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sphere Arcade | Play. Train. Compete.',
  description: 'Premium web game launcher powered by Sphere. Challenge AI, train your skills, and compete.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <SphereProvider>
          <Navbar />
          {children}
        </SphereProvider>
      </body>
    </html>
  );
}