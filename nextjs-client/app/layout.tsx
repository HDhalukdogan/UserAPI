import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Providers from './providers';
import InitApp from './ui/InitApp';

export const metadata: Metadata = {
  title: {
    template: '%s | Next Dashboard',
    default: 'Next Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <InitApp/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
