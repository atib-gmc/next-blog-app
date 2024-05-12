
import { log } from "console";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

export default async function handler() {
  const router = useRouter()
  console.log(router.query);
  return NextResponse.json({ message: "hello from req" }, { status: 200 })
}
