"use client";
import { useState, createContext, useContext, useEffect, useCallback, type ReactNode} from "react";
import type { UserSchema } from "~/server/api/routers/user.schema";
import { api } from "~/trpc/react";
import type { User } from "~/types/user.interface";
import { toast } from "sonner";
import type z from "zod";

interface UserContextType {
  users: z.infer<typeof UserSchema>[];
  isLoading: boolean;
  isActionPending: boolean;
  update: (user: z.infer<typeof UserSchema>) => Promise<void>;
  deleteUser: (data: { id: number }) => Promise<void>;
  create: (user: z.infer<typeof UserSchema>) => Promise<void>;
  getById: (data: { id: number }) => Promise<z.infer<typeof UserSchema>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsersState] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usersData] = api.user.getAll.useSuspenseQuery() ?? [];

  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("User Updated Successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  const deleteMutation = api.user.delete.useMutation();
  const createMutation = api.user.create.useMutation({
    onSuccess: () => {
      toast.success("User Created Successfully!");
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
      toast.error(`Error: ${error.message}`);
    },
  });


  useEffect(() => {
    setIsLoading(true);
    if (usersData) {
      setUsersState(usersData);
      setIsLoading(false);
    }
  }, [usersData]);

  const update = async (user: z.infer<typeof UserSchema>) => {
    await updateMutation.mutateAsync(user as User);
    setUsersState([...users]);
  };

  const create = async (user: z.infer<typeof UserSchema>) => {
    const created = await createMutation.mutateAsync(user as User);
    setUsersState([...users, created]);    
  };

  const getById = useCallback(async ({ id }: { id: number }): Promise<User> => {
    const verifyUser = users.length > 0 ? users : (usersData ?? []);
    const findUser = verifyUser.find(user => user.id === id);

    return findUser as unknown as User;
  }, [users, usersData]);

  const deleteUser = async ({ id }: { id: number }) => {
    await deleteMutation.mutateAsync({ id });
    const result = users.filter(user => user.id !== id);
    toast.success("User Deleted Successfully!");
    setUsersState(result);
  };
  return (
    <UserContext.Provider value={{ 
      users,
      isLoading: isLoading, 
      isActionPending: updateMutation.isPending || deleteMutation.isPending,
      update, 
      deleteUser,
      create,
      getById,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("context must be used within UserProvider");
  return context;
};