"use server";
import { prisma } from "@/lib/prisma";
import { post } from "./page";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { log } from "console";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export async function createPost(form: post) {
  const user = await getServerSession(authOption);
  if (!user) return redirect("/login");
  try {
    await prisma.post.create({
      data: {
        title: form.title,
        content: form.body,
        authorId: Number(user.user.id),
        excerpt: form.excerpt
      },
    });
    revalidatePath("/", "layout")
    NextResponse.json({ message: "post successfuly" }, { status: 200 })
    redirect("/")
  } catch (error) {
    NextResponse.json({ message: "something went wrong" }, { status: 500 })
    log(error)
  }
}
