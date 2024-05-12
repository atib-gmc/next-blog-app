"use client"
import { signIn } from "next-auth/react"
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
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import LoginBtn from "./LoginBtn"
import { useRouter } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }).email({ message: "incorect email format" }),
  password: z.string().min(6)
})

export function FormLogin({ error }: { error?: string }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { email, password } = data
      const res = await signIn("credentials", { callbackUrl: "/", email, password })
      if (!res) return
      router.push("/")
      toast({
        title: error ? error : "Login successfully",
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-2/5 border w-full mt-10  shadow-md p-5 rounded-md  bg-background  h-full overflow-hidden  mx-auto space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input size={90} placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={`${showPassword ? "text" : "password"}`} placeholder="password" {...field} className="" />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="show-password items-center gap-2 flex">
          <Checkbox onCheckedChange={() => setShowPassword(prev => !prev)} id="show" name="show" />
          <label className="text-muted-foreground" htmlFor="show">show password</label>
        </div>
        {/* <Button type="submit">Submit</Button> */}
        <p className="text-red-400 text-sm">{error && error}</p>
        <LoginBtn />

        <p className="text-accent-secondary">dont have an account?<Button asChild variant={"link"}><Link href="/register" >Register</Link>
        </Button></p>
      </form>
    </Form>
  )
}
