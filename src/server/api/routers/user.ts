'use strict';

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const apiUrl: string = process.env.NEXT_PUBLIC_MOCKUP_USER_DATA_JSON_URL ?? "https://jsonplaceholder.typicode.com/users";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure.meta({ 
      openapi: { method: 'GET', path: '/users/' } 
    }).query(async () => {
        const response = await fetch(apiUrl);
        return response.json();
    }),
    getById: publicProcedure
    .meta({ 
      openapi: { method: 'GET', path: '/users/{id}' } 
    })
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
        const response = await fetch(`${apiUrl}/${input.id}`);
        return response.json();
    })
});