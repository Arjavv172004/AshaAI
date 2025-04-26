import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asha AI',
  description: 'Welcome to Asha AI - Your Intelligent Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 