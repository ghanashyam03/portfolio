import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { StarfieldWrapper } from '@/components/three/StarfieldWrapper';
import { Loader } from '@/components/ui/Loader';
import { Wordmark } from '@/components/ui/Wordmark';
import { OrbitalNav } from '@/components/ui/OrbitalNav';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { PageTransition } from '@/components/layout/PageTransition';
import { Footer } from '@/components/layout/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

/* NOTE: Add a custom 1200x630 OpenGraph image at /public/og-image.png for social previews */

export const metadata: Metadata = {
  title: 'Ghanashyam V Narayan | AI/ML Engineer & Astrodynamics Research',
  description:
    'Portfolio of Ghanashyam V Narayan — AI/ML engineer building agentic systems and physics-constrained ML pipelines, with research interests in computational astrophysics.',
  openGraph: {
    title: 'Ghanashyam V Narayan | AI/ML Engineer & Astrodynamics Research',
    description:
      'Portfolio of Ghanashyam V Narayan — AI/ML engineer building agentic systems and physics-constrained ML pipelines, with research interests in computational astrophysics.',
    url: 'https://portfolio-ghanashyam.vercel.app',
    siteName: 'Ghanashyam V Narayan Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghanashyam V Narayan | AI/ML Engineer & Astrodynamics Research',
    description:
      'Portfolio of Ghanashyam V Narayan — AI/ML engineer building agentic systems and physics-constrained ML pipelines, with research interests in computational astrophysics.',
  },
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
      <body className="bg-[#05060A] text-[#F5F7FF] antialiased selection:bg-[#7C3AED] selection:text-white flex flex-col min-h-screen">
        <Loader />
        <CustomCursor />
        <Wordmark />
        <OrbitalNav />
        <StarfieldWrapper />
        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
      </body>
    </html>
  );
}
