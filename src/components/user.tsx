"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { UserList } from "~/components/userList";
import type { User } from "~/types/user.interface";
import { Button } from "./ui/button";

export function LatestUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [initialUsers, isLoaded] = api.user.getAll.useSuspenseQuery() ?? [];

  const deleteUserMutation = api.user.delete.useMutation({
    onSuccess: () => {
      console.log('User deleted!');
      toast('User Deleted Successfully!');

    },
    onError: (error) => {
      toast(`Error deleting user: ${error.message}`);
    },
    onMutate: async (variables) => {
      console.log('Deleting user with id:', variables.id);
    },
    onSettled: (data) => {
      setUsers(data ?? []);
    },
  });

  const onHandleDelete = (userId: number) => {
    deleteUserMutation.mutate({ id: userId });
  };

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0) {
      setUsers(initialUsers);
    }
  }, [initialUsers]);

  return (
    <div className="w-full space-y-4 rounded-lg bg-white/10 p-4">
      <h2 className="text-2xl font-bold">Users Information</h2>
      <Button>Create User</Button>
      {
        users.length > 0 ? (
                <UserList users={users} handleDelete={onHandleDelete} />
        ) : (
          <p>No users to display.</p>
        )
      }
    </div>
  );
}