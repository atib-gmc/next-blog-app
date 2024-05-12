
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React, { ReactNode, Suspense } from 'react'
import Resizeable from './Resizeable'
export const metadata = {
  title: "Dashboard "
}
export default async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession()
  if (!session) return redirect("/login")
  return (
    <Resizeable>
      <Suspense fallback={<h1>Loading...</h1>}>
        {children}
      </Suspense>
    </Resizeable>
  )
}
