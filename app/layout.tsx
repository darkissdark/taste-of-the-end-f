import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Montserrat } from 'next/font/google';
import { ToasterClient } from '@/components/ui/ToasterClient/ToasterClient';
import type { Metadata } from 'next';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import IconsSprite from '@/components/ui/icons/IconsSprite';
import { defaultMetadata } from '@/lib/seo';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import { AuthDialogGate } from '@/components/layout/AuthDialog/AuthDialogGate';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <IconsSprite />
            <Header />
            <main>{children}</main>
            <Footer />
            <AuthDialogGate />
            <ToasterClient />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
