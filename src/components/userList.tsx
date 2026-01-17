"use client";

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
import Link from "next/dist/client/link";
import { Button } from "~/components/ui/button";
import type { User } from "../types/user.interface";

export function UserList({users, handleDelete
}: {users: User[], handleDelete: (userId: number) => void}) {
    return <Table>
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
                                <Link
                                    className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 pr-2 mr-2"
                                    href={`/users/edit/${user.id}`}
                                >
                                    Edit
                                </Link>
                                <Button
                                    className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 pr-2 mr-2"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableCell colSpan={4}>Total of Users</TableCell>
                        <TableCell className="text-right">{users.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                    </Table>;
};