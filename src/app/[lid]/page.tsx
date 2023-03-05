'use client';
import fetchApi from '@/lib/fetch';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { z } from 'zod';

const schema = z.object({
  status: z.union([z.literal(404), z.literal(200)]),
  url: z.union([z.string().url(), z.null()]),
});

type TResponse = z.infer<typeof schema>;

export default function Slug() {
  const router = useRouter();
  const lid = usePathname().slice(1);
  const { data } = useQuery(['link'], async () => {
    return fetchApi<TResponse>(`http://localhost:3000/api/find/${lid}`);
  });

  if (data?.status === 200 && data?.url !== null) {
    return router.replace(data.url);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h2 className="text-3xl">Not Found</h2>
    </div>
  );
}
