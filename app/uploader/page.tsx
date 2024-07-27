"use client"
import { deleteImage, getPublicIdFromUrl } from '@/utils/utils'
import { useState } from 'react'
// import { deleteImage } from './actions'

export default function Page() {
  const [url, seturl] = useState("")
  async function deleteImg() {
    let public_id = getPublicIdFromUrl(url)
    if (!public_id) {
      return console.log("invalid url")
    }
    try {
      await deleteImage(public_id!)
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <div>
      <input className='input' type="text" onChange={(e) => seturl(e.target.value)} />
      <button onClick={deleteImg} className="btn btn-sm">delete</button>
    </div>
  )
}
