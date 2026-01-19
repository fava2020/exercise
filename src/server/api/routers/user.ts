'use strict';

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { UserSchema, UserSchemaValidation } from "~/server/api/routers/user.schema";
import { TRPCError } from "@trpc/server";
import { initialUserValidation } from "~/server/api/routers/initialUsersValidation";

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
        users = await initialUserValidation(users, apiUrl);
        return users ?? [];
    }),
    getById: publicProcedure
    .meta({ 
      openapi: { method: 'GET', path: '/getById/{id}' } 
    })
    .input(z.object({ id: z.number() }))
    .output(UserSchema)
    .query(async ({ input }) => {
        /* *
        * Refactored getById method into a Provider! 🎀🎀🎀🎀🎀 The previous logic was losing the 
        * user array on re-renders, so Context is now our single source of truth for this specific method 🎀🎀🎀🎀
        **/

        const { id } = input;
        users = await initialUserValidation(users, apiUrl);
        const user = users.find((user) => user.id === id);

        if (!user) {
            throw new TRPCError({
            code: "NOT_FOUND",
            message: `User with id ${id} not found. ${JSON.stringify(user)} ${JSON.stringify(users)}`,
            });
        }
       
        return user;
    }),
    create: publicProcedure
    .meta({ openapi: { method: "POST", path: "/create" } })
    .input(UserSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
        const { ...userData } = input;
        const id = generateNewUserId();

        const user: z.infer<typeof UserSchema> = { id, ...userData };
        users = [...users, user];
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
                message: `User with id ${id} not found. ${JSON.stringify(userIndex)} `,
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