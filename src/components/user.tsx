"use client";

import { UserList } from "~/components/userList";
import Link from "next/dist/client/link";
import { useUser } from "~/context/UserProvider";
import { Badge } from "./ui/badge";
import UserSkeleton from "./userSkeleton";

export function LatestUsers() {
  const { users, deleteUser, isLoading } = useUser();
  const onHandleDelete = (userId: number) => {
    deleteUser({ id: userId }).then(response => {
      console.info('User Deleted Successfully!', response)
    }).catch(error => console.warn(error));
  };

  if (isLoading) {
    return  <UserSkeleton />;
  }

  return (
    <div className="w-full space-y-4 rounded-lg bg-white/10 p-4">
      <h2 className="text-2xl font-bold">Users Information</h2>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          className="w-full rounded bg-gray-200 px-4 py-2 font-semibold text-black hover:bg-gray-100 pr-2 mr-2"
          href={`/users/create`}
        >
          Create User
        </Link>
      </div>
      
      {
        users.length > 0 ? (
                <UserList users={users} handleDelete={onHandleDelete} />
        ) : (
          <Badge className="w-full px-1 font-mono" variant="destructive">No users to display</Badge>
        )
      }
    </div>
  );
}