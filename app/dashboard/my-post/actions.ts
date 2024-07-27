"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { post } from "./EditForm"
import { Record } from "@prisma/client/runtime/library"

export async function deletePost(form: FormData) {
  const id = form.get("id")
  if (!id) return
  await prisma.post.delete({ where: { id: Number(id) } })
  revalidatePath("/dashboard/my-post")
  return
}

export async function updatePost(data: post): Promise<Record<any, any>> {

  if (!data) return { error: null, message: `post not found` };
  try {
    await prisma.post.update({ where: { id: Number(data.id) }, data: { title: data.title, content: data.body, excerpt: data.excerpt, featured_image: data.featured_image } })
    revalidatePath("/dashboard/my-post")
    return { error: null, message: `post updated successfully` };

  } catch (error) {
    return {
      error: {
        err: JSON.stringify(error)
      },
      message: "Failed submission",
    };
  }
}
