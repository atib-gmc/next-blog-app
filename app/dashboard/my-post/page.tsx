import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { DataTable } from "./data-table"
import { columns } from "./column"

export default async function page() {

  const session = await getServerSession()
  if (!session) return redirect("/login")
  const posts = await prisma.post.findMany({ where: { authorId: { equals: session.user.id } } })
  return (
    <div className="container">

      <DataTable data={posts} columns={columns} />
    </div>
  )
}

