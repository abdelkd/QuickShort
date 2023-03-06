'use client';
import React from 'react';
import fetchApi from '@/lib/fetch';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { z } from 'zod';

const schema = z.object({
  status: z.union([z.literal(404), z.literal(200)]),
  url: z.union([z.string().url(), z.null()]),
});

type TResponse = z.infer<typeof schema>;

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

export default function Slug() {
  const router = useRouter();
  const lid = usePathname().slice(1);
  const { data, isLoading } = useQuery(['link'], async () => {
    return fetchApi<TResponse>(`/api/find/${lid}`);
  });

  if (data?.status === 200 && data?.url !== null) {
    router.replace(data.url);
    return (
      <Container>
        <h2 className="text-3xl">Redirecting...</h2>
      </Container>
    );
  }

  if (isLoading || data?.url !== null) {
    return (
      <Container>
        <h2 className="text-3xl">Looking for it...</h2>
      </Container>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h2 className="text-3xl">Not Found</h2>
    </div>
  );
}
