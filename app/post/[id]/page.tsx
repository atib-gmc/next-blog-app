
import { FacebookShareButton, FacebookIcon } from "react-share"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ShareFacebook, ShareTwitter } from "./share"
import { Suspense } from "react"
import ImageSkeleton from "@/components/ui/skeleton/ImageSkeleton"
import { BreadcrumbWithCustomSeparator } from "./Breadcrumb"
async function getData(id: any): Promise<Post | null> {
  const res = await fetch(`${process.env.URL}/api/post/${id}`, { cache: "no-store" })
  const data = await res.json()
  return data.post
}
type Author = {
  email: string,
  id: number,
  name: string
}

type Post = {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  author: Author
  authorId: number;
  createdAt: string; // You might want to use a Date type here
  updatedAt: string; // You might want to use a Date type here
};
export default async function page(props: { params: { id: string } }) {
  const { id } = props.params
  const data = await getData(id)



  return (
    <div className="container prose px-32 mt-10 tiptap mx-auto text-center  w-full mx-auto">
      <BreadcrumbWithCustomSeparator >
        <span>
          {data?.title}
        </span>
      </BreadcrumbWithCustomSeparator>
      <div className="topbar">

        <Badge variant={"outline"}>{data?.createdAt.split(":")[0].slice(0, -3)}</Badge>
        <Badge variant={"outline"}>by : {data?.author.name}</Badge>

        <h1>{data?.title}</h1>
        <figcaption className="mx-auto max-w-[60rem]  max-h-[6orem]">

          <Suspense fallback={<ImageSkeleton />} >
            <Image
              src="https://images.unsplash.com/flagged/photo-1577912504896-abc46b500434?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className=" mx-auto max-h-[30rem] border border-input shadow-xl dark:shadow-gray-500/10 rounded-md  my-5 h-full bg-cover w-full"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </Suspense>
        </figcaption>
      </div>
      <div className="max-w-[50rem] text-justify mx-auto  " dangerouslySetInnerHTML={{ __html: data?.content! }}>
      </div>
      <div className="share space-x-3 space-y-2">
        <h4>Share :</h4>
        <ShareFacebook />
        <ShareTwitter />
      </div>
    </div>
  )
}

