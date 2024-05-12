import React from 'react'
import { FormRegister } from './Form'
export const metadata = {
  title: "Register - Blogapp"
}

export default function RegisterPage() {
  return (
    <div className="form-container w-full    flex ">
      <FormRegister />
    </div>
  )
}

