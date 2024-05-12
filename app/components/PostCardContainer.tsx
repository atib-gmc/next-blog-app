import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from "@/lib/prisma"
import Link from 'next/link';
import React from 'react'


export default async function PostCardContainer() {

  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true, email: true, id: true } } },
  });

  type Tpost = typeof posts[0]

  return <>
    {posts.map((post: Tpost) => (
      <Card className="md:min-w-xl max-w-[17rem] w-full" key={post.id}>
        <CardHeader className='overflow-hidden'>
          <CardTitle className='line-clamp-2 text-xl'>{post.title}</CardTitle>
          <CardDescription className='break-all line-clamp-3 text-justify w-full '>{post.excerpt}</CardDescription>
        </CardHeader>
        <CardContent >
          <p>{post.author ? post.author.name : "No Author"}</p>
        </CardContent>
        <CardFooter>
          {/* <p>{post.author ? post.author.email : "No Email"}</p> */}
          <Link href={`post/${post.id}`}>
            <Button size={"sm"}>Read...</Button>
          </Link>
        </CardFooter>
      </Card>
    ))}
  </>

}

