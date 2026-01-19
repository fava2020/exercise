import { TRPCError } from "@trpc/server";
import type { UserSchema } from "./user.schema";

export const initialUserValidation = async (users: UserSchema = [], apiUrl: string) => {
  if (users?.length === 0 && apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch initial user data.',
        });
      }
      users = await response.json() as UserSchema[];
    } catch (error) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred, please try again later.',
            cause: error,
        });
    }
  }
  return users;
};