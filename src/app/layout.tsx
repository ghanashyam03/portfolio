import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { StarfieldWrapper } from '@/components/three/StarfieldWrapper';
import { Loader } from '@/components/ui/Loader';
import { Wordmark } from '@/components/ui/Wordmark';
import { OrbitalNav } from '@/components/ui/OrbitalNav';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PageTransition } from '@/components/layout/PageTransition';

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#05060A] text-[#F5F7FF] antialiased selection:bg-[#7C3AED] selection:text-white">
        <Loader />
        <CustomCursor />
        <Wordmark />
        <OrbitalNav />
        <StarfieldWrapper />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
