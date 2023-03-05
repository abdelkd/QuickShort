'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type PageProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

function Providers({ children }: PageProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
