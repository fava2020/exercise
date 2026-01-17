'use strict';

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { User } from "~/types/user.interface";
import { UserSchema, UserSchemaValidation } from "~/server/api/routers/user.schema";
import { TRPCError } from "@trpc/server";

const apiUrl: string = process.env.NEXT_PUBLIC_MOCKUP_USER_DATA_JSON_URL ?? '';

let users: z.infer<typeof UserSchema>[] = [];

const generateNewUserId = () => {
  const id = users[users.length - 1]?.id ?? 0;
  return id + 1;
};

export const userRouter = createTRPCRouter({
    getAll: publicProcedure
    .meta({ openapi: { method: "GET", path: "/getAll" } })
    .output(z.array(UserSchema))
    .query(async () => {
        try {
            if (users.length === 0) {
                const response = await fetch(apiUrl);
                users = await response.json() as unknown as User[];
            }

            return users ?? [];
        } catch (error) {
                throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred, please try again later.',
                cause: error,
            });
        }
    }),
    getById: publicProcedure
    .meta({ 
      openapi: { method: 'GET', path: '/getById/{id}' } 
    })
    .input(z.object({ id: z.number() }))
    .output(UserSchema)
    .query(async ({ input }) => {
        const { id } = input;
        const response = await fetch(`${apiUrl}/${id}`);
        const user = await response.json() as unknown as z.infer<typeof UserSchema>;
        return user;
    }),
    create: publicProcedure
    .meta({ openapi: { method: "POST", path: "/create" } })
    .input(UserSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
        const { ...userData } = input;
        const id = generateNewUserId();

        const user: z.infer<typeof UserSchema> = { id, ...userData };
        users.push(user);
        return user;
    }),
    update: publicProcedure
    .meta({ 
      openapi: { method: 'POST', path: '/update/{id}' } 
    })
    .input(UserSchemaValidation)
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      try {
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex < 0) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `User with id ${id} not found.`,
            });
        }

        users[userIndex] = { id, ...updateData};

        return users[userIndex];
      } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: (error as Error).message };
      }
    }),
    delete: publicProcedure
    .meta({ 
      openapi: { method: 'DELETE', path: '/delete/{id}' } 
    })
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
        const { id } = input;
        users = users.filter(user => user.id !== id);
        return users;    
    }),
});