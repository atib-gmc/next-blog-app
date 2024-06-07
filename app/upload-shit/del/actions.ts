"use server"
import cloudinary from "@/utils/cloudinary"

export async function deleteMutation(data: FormData) {
  await cloudinary.v2.uploader.destroy(data.get("id") as string, function(err, res) {
    if (err) return { error: "something went wrong" }
    return {
      item: res
    }
  })
}
