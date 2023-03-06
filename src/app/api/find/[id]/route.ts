import { prisma } from '@/lib/prisma';
import { getRequestMeta } from 'next/dist/server/request-meta';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request, context: any, res: Response) {
  const { id } = context?.params;

  const link = await prisma.links.findUnique({
    where: {
      short_id: id,
    },
    select: {
      original_url: true,
    },
  });

  console.log('link', link);

  if (link === null) {
    return NextResponse.json({
      status: 404,
      url: null,
    });
  }

  if (link?.original_url) {
    return NextResponse.json({
      status: 200,
      url: link.original_url,
    });
  }
}
