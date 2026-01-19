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
import { DeleteIcon, EditIcon, ViewIcon } from "lucide-react";
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
                                <div className="flex flex-wrap items-center gap-2 md:flex-row">
                                    <Link
                                        href={`/users/${user.id}`}
                                    >
                                        <ViewIcon />
                                    </Link>
                                    <Link
                                        href={`/users/edit/${user.id}`}
                                    >
                                        <EditIcon />
                                    </Link>
                                    <Button
                                        variant="link"
                                        size="icon"
                                        className="cursor-pointer"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </div>
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