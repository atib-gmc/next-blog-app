import cloudinary from "@/utils/cloudinary"

// import {delete } from "./actions.ts"
export default function page() {

  async function deleteImage(data: FormData) {
    "use server";
    const id = data.get("id") as string;

    try {
      const response = await cloudinary.v2.api.delete_resources([id], {
        resource_type: "image",
        invalidate: true,
      })
      console.log(response); // Log the successful deletion response
    } catch (error) {
      console.log(error)
      if (error.request && error.request.timedOut) {
        console.error("Request timed out. Please try again.");
        // Handle timeout gracefully, e.g., display error message to user
      } else {
        console.error("Error deleting image:", error);
        // Handle other errors
      }
      return { error: "Failed to delete image" };
    }
  }

  return (
    <form action={deleteImage}>
      <input type="text" name="id" id="id" />
      <button>delete</button>
    </form>
  )
}

