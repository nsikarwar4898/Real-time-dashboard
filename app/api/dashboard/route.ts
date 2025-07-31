import { envParameters } from '@/lib/utils/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = envParameters.webUrl || '';

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${envParameters.webUrlToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
  }

  const data = await res.json();

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
