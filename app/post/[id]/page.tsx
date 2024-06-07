
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
  author: Author
  featured_image: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
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
              src={data?.featured_image!}
              className=" mx-auto max-h-[30rem] h-full border border-input shadow-xl dark:shadow-gray-500/10 rounded-md  my-5 h-full bg-cover w-full"
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

