"use client"
import React, { ReactNode } from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
export default function SignOutBtn({ children }: { children: ReactNode }) {
    return (
        <Button variant={"default"} className='p-2 w-full' onClick={() => signOut({ callbackUrl: "/login" })}>{children}</Button>
    )
}
