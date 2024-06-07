"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function page() {
  const [image, setImage] = useState<FileList | null>(null)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!image) return
    const formData = new FormData()
    formData.append('file', image[0])
    formData.append("upload_preset", "jmm5aqtp")
    const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    })
    const res = await data.json()
    console.log(res)
  }
  return (
    <form onSubmit={handleSubmit} >
      <Input type="file" name="upload" onChange={e => setImage(e.target.files)} />
      <Button type="submit">Upload</Button>
    </form>
  )
}

