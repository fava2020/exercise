"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { DeleteIcon, EditIcon, ViewIcon } from "lucide-react";
import Link from "next/dist/client/link";
import { Button } from "~/components/ui/button";
import type { User } from "../types/user.interface";
import { useState } from "react";
import { Input } from "./ui/input";

export function UserList({users, handleDelete
}: {users: User[], handleDelete: (userId: number) => void}) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns: ColumnDef<Partial<User>>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Name
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "username",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Username
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => (
            <div className="capitalize">{row.getValue("username")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Email
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        },
        {
            accessorKey: "company.name",
            id: "companyName",
            header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Company
                <ArrowUpDown />
                </Button>
            )
            },
            cell: ({ row }) => <div className="text-right font-medium">{row.getValue("companyName")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {

            const id = row.original.id;    

            return (
                <div className="flex flex-wrap items-center gap-2 md:flex-row">
                    <Link
                        href={`/users/${id}`}
                    >
                        <ViewIcon />
                    </Link>
                    <Link
                        href={`/users/edit/${id}`}
                    >
                        <EditIcon />
                    </Link>
                    <Button
                        variant="link"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleDelete(Number(id))}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            )
            },
        },
        ]

    const table = useReactTable({
    data: users ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

    return <div className="w-full">
        <div className="flex items-center py-4">
            <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
        </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>;
};