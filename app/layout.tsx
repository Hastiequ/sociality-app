import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Sociality',
  description: 'Social media platform MVP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased bg-[#0d0e12] text-white'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
