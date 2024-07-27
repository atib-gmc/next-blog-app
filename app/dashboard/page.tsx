"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createPost } from "./actions"
import TextEditor from "@/components/ui/TextEditor"
import { toast } from "@/components/ui/use-toast"
import { ChangeEvent, useState } from "react"
import { Badge } from "@/components/ui/badge"

const FormSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().min(6),
  excerpt: z.string().min(3).max(300),
  is_published: z.boolean().default(false),
  featured_image: z.any()
})

export type post = z.infer<typeof FormSchema>
export default function Dashboard() {
  const [featuredImage, setFeaturedImage] = useState<FileList | undefined>(undefined)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      body: "",
      title: "",
      excerpt: "",
    }
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (featuredImage) {
        const formData = new FormData()
        formData.append('file', featuredImage[0])
        formData.append("upload_preset", "jmm5aqtp")
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData
        })
        const image = await response.json()
        await createPost({ ...data, featured_image: image.url })
        toast({
          title: "Post created",
          description: "Post created successfully"
        })
        form.reset()
        setFeaturedImage(undefined)
      }
      else {
        await createPost({ ...data })
        toast({
          title: "Post created",
          description: "Post created successfully"
        })
        form.reset()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFeaturedImage(e.target.files);
    }
  };

  return (
    <Form {...form} >
      <label htmlFor="featured_image">
        <p className="my-2 text-sm">featured image(optional)</p>
        <Input type="file" onChange={imageChange} />
      </label>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:max-w-xl w-full border  mt-10  shadow-md p-5 rounded-md  bg-background  h-full overflow-hidden  mx-auto space-y-3">
        {featuredImage && <div className="relative">
          <img src={URL.createObjectURL(featuredImage[0])} />
          <Badge onClick={() => setFeaturedImage(undefined)} className="absolute cursor-pointer  -top-2 w-8 h-8 bg-red-500 flex justify-center items-center hover:bg-red-600 -right-2">
            <span>x</span>
          </Badge>
        </div>}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full ">
              <
                FormLabel>Title Article</FormLabel>
              <FormControl>
                <Input size={90} placeholder="title" {...field} />
              </FormControl>
              <FormDescription>
                Create title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <
                FormLabel>excerpt </FormLabel>
              <FormControl>
                <Input size={90} placeholder="excerpt" {...field} />
              </FormControl>
              <FormDescription>
                excerpt
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                {/* <Textarea {...field} placeholder="content" className="min-h-32" /> */}
                <div className="wrapper">
                  <TextEditor name="body" reset={form.formState.isSubmitSuccessful} onChange={field.onChange} description={field.value} />
                </div>
              </FormControl>
              <FormDescription>
                tuliskan artikel kamu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
        {/* <p className="text-red-400 text-sm"></p> */}
        {/* <LoginBtn /> */}
        <Button disabled={form.formState.isSubmitting} variant={"default"} >{form.formState.isSubmitting ? "submiting..." : "submit"}</Button>

      </form>
    </Form>
  )
}
