import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Aiden Novak - Engineering-minded Builder',
  description: 'Physics major at Nankai University. Engineering-minded builder who turns messy problems into measurable systems.',
  openGraph: {
    title: 'Aiden Novak - Engineering-minded Builder',
    description: 'Physics major at Nankai University. Engineering-minded builder who turns messy problems into measurable systems.',
    type: 'website',
    url: 'https://aidennovak.com',
    siteName: 'Aiden Novak',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aiden Novak - Engineering-minded Builder',
    description: 'Physics major at Nankai University. Engineering-minded builder who turns messy problems into measurable systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
