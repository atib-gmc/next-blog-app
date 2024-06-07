import { prisma } from "../../../lib/prisma"
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, username } = await req.json() as { username: string, email: string, password: string }
  if (!email || !password || !username) return NextResponse.json({ message: "harap is semua input" }, { status: 400 })
  const isExist = await prisma?.user.findUnique({ where: { email } })
  if (isExist) return NextResponse.json({ message: "email is already used" }, { status: 400 })
  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await prisma?.user.create({ data: { email, name: username, password: hashPassword } })
  return NextResponse.json({ message: "user created", user: newUser }, { status: 200 })
}
export async function GET() {
  return NextResponse.json({ message: "hello" }, { status: 400 })
}
