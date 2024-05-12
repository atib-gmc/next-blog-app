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
import { useRouter } from "next/navigation"
import { createPost } from "./actions"
import TextEditor from "@/components/ui/TextEditor"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { useFormStatus } from "react-dom"

const FormSchema = z.object({
  title: z.string().max(100),
  body: z.string().min(6),
  excerpt: z.string().min(3).max(300),
  is_published: z.boolean().default(false)
})

export type post = z.infer<typeof FormSchema>
export default function Dashboard() {
  const { pending } = useFormStatus()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      body: "",
      title: "",
      excerpt: "",
      is_published: false
    }
  })
  // console.log(form.formState.isValidating)
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createPost(data)
    toast({
      title: "Post created",
      description: "Post created successfully"
    })
    form.reset()
  }
  console.log("pending : ", pending)
  console.log("isSuccess :", form.formState.isSubmitSuccessful)
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:max-w-xl w-full border  mt-10  shadow-md p-5 rounded-md  bg-background  h-full overflow-hidden  mx-auto space-y-3">
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
                  <TextEditor reset={form.formState.isSubmitSuccessful} onChange={field.onChange} description={field.value} />
                </div>
              </FormControl>
              <FormDescription>
                tuliskan artikel kamu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_published"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publish Now?</FormLabel>
              <FormControl>
                <Checkbox className="ml-2 w-4 h-4" onCheckedChange={field.onChange} value={field.value} />
              </FormControl>
              {/* <FormDescription> */}
              {/*   tuliskan artikel kamu */}
              {/* </FormDescription> */}
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
