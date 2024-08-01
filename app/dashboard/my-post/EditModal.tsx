"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react'
import EditForm from "./EditForm"


type post = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
export default function EditModal(post: post) {

  const [openDialog, setOpenDialog] = useState(false)


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
      <DialogTrigger asChild>
        <Button variant="ghost" size={"sm"} className="w-full pl-0 text-start ml-0" ><span className="text-start -ml-8 px-0 mx-0 flex ">Edit Post</span></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] no-scrollbar max-h-[70vh] overflow-y-scroll p-5">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your post with id of {post.id}. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditForm {...post} setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  )
}

