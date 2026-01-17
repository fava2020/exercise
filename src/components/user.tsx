"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { UserList } from "~/components/userList";

export function LatestUsers() {
  const [initialUsers] = api.user.getAll.useSuspenseQuery() ?? [];
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
    }
  }, [initialUsers]);

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

  const handleDelete = (userId: number) => {
    deleteUserMutation.mutate({ id: userId });
  };

  return (
    <div className="w-full space-y-4 rounded-lg bg-white/10 p-4">
      <h2 className="text-2xl font-bold">Users Information</h2>
      {
        users.length > 0 ? (
                <UserList users={users} handleDelete={handleDelete} />
        ) : (
          <p>No users to display.</p>
        )
      }
    </div>
  );
}