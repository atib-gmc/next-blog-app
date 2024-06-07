"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z, } from "zod"
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
import TextEditor from "@/components/ui/TextEditor"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { updatePost } from "./actions"
import { ChangeEvent, useState } from "react"
import { Badge } from "@/components/ui/badge"

const FormSchema = z.object({
  title: z.string().min(3).max(200),
  body: z.string().min(6),
  excerpt: z.string().min(3).max(300),
  featured_image: z.string().optional(),
  id: z.number().nullable()
})

type Tpost = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export type post = z.infer<typeof FormSchema>
export default function EditForm(post: Tpost) {

  const [featuredImage, setFeaturedImage] = useState<FileList | undefined>(undefined)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      body: post.content || "",
      title: post.title || "",
      excerpt: post.excerpt || "",
      id: post.id,
    }
  })


  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFeaturedImage(e.target.files);
    }
  };
  // console.log(form.formState.isValidating)
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // await createPost(data)
    console.log(data)
    return
    const res = await updatePost(data)
    // console.log(res)
    toast({
      title: "Post edited",
      description: "post edited successfully"
    })
    post.setOpenDialog(false)
    form.reset()
  }
  console.log(form.formState.errors)
  return (
    <Form {...form} >
      <label htmlFor="featured_image">
        <p className="my-2 text-sm">featured image(optional)</p>
        <Input type="file" onChange={imageChange} />
      </label>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:max-w-xl w-full shadow-md  rounded-md bg-background  h-full mx-auto space-y-3 ">
        {featuredImage ? <div className="relative">
          <img src={featuredImage ? URL.createObjectURL(featuredImage[0]) : post.featured_image} />
          <Badge onClick={() => setFeaturedImage(undefined)} className="absolute cursor-pointer  -top-2 w-8 h-8 bg-red-500 flex justify-center items-center hover:bg-red-600 -right-2">
            <span>x</span>
          </Badge>
        </div> : <div className="relative"> <img src={post.featured_image} />
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
                <div className="wrapper">
                  <TextEditor reset={form.formState.isSubmitSuccessful} name="body" onChange={field.onChange} description={field.value} />
                </div>
              </FormControl>
              <FormDescription>
                tuliskan artikel kamu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} variant={"default"} >{form.formState.isSubmitting ? "submiting..." : "submit"}</Button>
      </form>
    </Form >
  )
}
