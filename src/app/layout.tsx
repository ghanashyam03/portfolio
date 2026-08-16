import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { StarfieldWrapper } from '@/components/three/StarfieldWrapper';
import { Loader } from '@/components/ui/Loader';
import { PageWrapper } from '@/components/layout/PageWrapper';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter-body',
});

export const metadata: Metadata = {
  title: 'Ghanashyam V Narayan | AI/ML & Computational Astrophysics',
  description:
    'Portfolio of Ghanashyam V Narayan - AI/ML Engineer targeting astrophysics-adjacent AI/ML roles and computational astrophysics PhD programs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#05060A] text-[#F5F7FF] antialiased selection:bg-[#7C3AED] selection:text-white">
        <Loader />
        <StarfieldWrapper />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
