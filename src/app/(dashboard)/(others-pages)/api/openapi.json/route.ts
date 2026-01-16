import { NextResponse } from 'next/server';
import { openApiDocument } from '~/server/api/open-api/open-api';

export const GET = () => {
  return NextResponse.json(openApiDocument);
};