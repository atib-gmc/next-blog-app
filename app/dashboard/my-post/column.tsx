"use client"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { deletePost } from "./actions";
import EditModal from "./EditModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


type Post = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    accessorKey: "excerpt",
    header: "Excerpt",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background" align="end">
            <DropdownMenuLabel className="text-accent-foreground/70">Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild
            >
              <form action={deletePost}>
                <input type="hidden" name="id" id="id" value={data.id} />
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem >
            <DropdownMenuItem asChild >{<EditModal {...data} />}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu >
      )
    }
  }
]
