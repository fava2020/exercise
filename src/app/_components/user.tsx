"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/components/navigation";
import type { User } from "../../types/user.interface";

export function LatestUsers() {
  const router = useRouter()
  const [users] = api.user.getAll.useSuspenseQuery();
  
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Skeleton className="h-10 w-full" / >;
  }

  return (
    <div className="w-full space-y-4 rounded-lg bg-white/10 p-4">
      <h2 className="text-2xl font-bold">Users Information</h2>
      {
        users ? (
                <><Table>
                    <TableCaption>A list of users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Company</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: User) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">{user.company.name}</TableCell>
                            <TableCell className="text-right">
                                <Link
                                    href={`/users/${user.id}`}
                                    className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 pr-2 mr-2"
                                >
                                    View
                                </Link>
                                <Button
                                    className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 pr-2 mr-2"
                                    onClick={() => alert(`User: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nWebsite: ${user.website}\nAddress: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 pr-2 mr-2"
                                    onClick={() => alert(`User: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nWebsite: ${user.website}\nAddress: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableCell colSpan={3}>Total of Users</TableCell>
                        <TableCell className="text-right">{users.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                    </Table></>
        ) : (
          <p>We don't have users.</p>
        )
      }
    </div>
  );
}