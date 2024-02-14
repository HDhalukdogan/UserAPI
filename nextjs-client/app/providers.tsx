'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import StoreProvider from './StoreProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <StoreProvider>
          {children}
        </StoreProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
