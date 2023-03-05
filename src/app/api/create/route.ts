import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

function generateKey() {
  let key = '';
  const Alpha =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (var i = 0; i <= 6; i++) {
    let randomInt = Math.floor(Math.random() * 62);
    key += Alpha[randomInt];
  }

  return key;
}

export async function POST(req: Request, res: NextResponse) {
  const { url } = await req.json();
  let key = generateKey();

  // find if the generated key exists on db
  // generate another key
  const alreadyExists = await prisma.links.findUnique({
    where: {
      short_id: key,
    },
  });

  if (alreadyExists !== null) key = generateKey();

  await prisma.links.create({
    data: {
      short_id: key,
      original_url: url,
    },
  });

  return NextResponse.json({ key, url: `${process.env.BASE_URL}${key}` });
}
