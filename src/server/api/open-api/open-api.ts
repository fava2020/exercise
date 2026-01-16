import { generateOpenApiDocument } from 'trpc-openapi';

import { appRouter } from "~/server/api/root";


export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Technical Test API',
  description: 'API documentation for the Technical Test management dashboard',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
});