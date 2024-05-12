import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const post = await prisma?.post.findUnique({ where: { id: Number(id) }, include: { author: { select: { name: true, email: true, id: true } } } })
    if (!post) return NextResponse.json({ message: "post tidak di temukan" })
    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" }, { status: 500 })
  }
}
