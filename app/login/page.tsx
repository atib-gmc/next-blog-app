import React from 'react'
import { FormLogin } from './Form'
import Head from 'next/head'
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation"
export const metadata = {
  title: {
    default: "Login ",
    template: "%s | login"
  },
  description: "%s | login page"

}

export default async function LoginPage(props: { searchParams?: any }) {
  const session = await getServerSession()
  if (session) redirect("/")
  return (
    <div className="form-container w-full    flex ">
      <FormLogin error={props?.searchParams?.error} />
    </div>
  )
}

