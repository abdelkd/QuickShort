'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { useMutation } from 'react-query';
import Link from 'next/link';

const schema = z
  .object({
    url: z.string().url(),
  })
  .required();

export default function Home() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, data, isError, isLoading } = useMutation(
    ['pew'],
    async () => {
      return await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({ url: getValues('url') }),
      }).then(async (res) => await res.json());
    }
  );

  const shortenUrl = async () => {
    mutate();
  };

  return (
    <main className="flex h-full w-full items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit(shortenUrl)}>
        <div className="flex h-16 flex-col">
          <div className="flex h-16 justify-center gap-3 sm:w-96">
            <input
              type="text"
              className="h-9 rounded-md border border-gray-300 px-1 text-xl shadow-md shadow-gray-400/40 outline outline-1 outline-gray-300/60 sm:w-96"
              {...register('url')}
            />
            <input
              type="submit"
              value="Short"
              className="h-9 w-20 cursor-pointer rounded-md bg-black px-3 py-1 text-gray-50 shadow-md shadow-gray-300 focus:bg-gray-900/70 disabled:cursor-not-allowed disabled:bg-gray-900/70"
              disabled={isLoading}
            />
          </div>
          {isLoading && <p className="">Generating Link</p>}
          {errors.url && <p className="text-[red]">This is not a valid URL</p>}
          {isError && (
            <p className="text-[red]">Could not generat short link</p>
          )}
          {data && (
            <div className="flex flex-col">
              <p className="block text-green-600">Link has been created</p>
              <div className="mt-4 flex gap-2">
                <p className="cursor-pointer underline"><Link href={`/${data.key}`}>{data.url}</Link></p>
                <ClipboardIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={async () => {
                    await navigator.clipboard.writeText(data.url);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
