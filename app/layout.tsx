import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abelohost Shop - E-commerce Store',
  description: 'Professional e-commerce application with authentication and product catalog',
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