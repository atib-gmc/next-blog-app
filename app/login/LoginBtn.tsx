import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function LoginBtn() {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending}>{pending ? "Submitting..." : "Login"}</Button>
    )
}
