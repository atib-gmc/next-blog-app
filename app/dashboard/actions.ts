"use server";
import { prisma } from "@/lib/prisma";
import { post } from "./page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { log } from "console";
import { revalidatePath } from "next/cache";
import authOptions from "@/lib/auth";
export async function createPost(form: post) {
  const user = await getServerSession(authOptions);
  if (!user) return redirect("/login");
  try {
    await prisma.post.create({
      data: {
        title: form.title,
        content: form.body,
        authorId: Number(user.user.id),
        excerpt: form.excerpt,
        featured_image: form.featured_image
      },
    });
    revalidatePath("/dashboard/my-post")
    return {
      error: null,
      message: "Post created successfully",
    }
  } catch (error) {
    log(error)
    return {
      error: {
        err: JSON.stringify(error)
      },
      message: "Failed submission",
    }
  }
}
