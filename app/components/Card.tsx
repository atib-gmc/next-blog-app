import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export type Tpost = {
  author: {
    id: number;
    email: string;
    name: string | null;
  };
} & {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
export default function CardPost(post: Tpost) {

  return (
    <Card className="md:min-w-xl max-w-[17rem] w-full" key={post.id}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.author ? post.author.name : "No Author"}</p>
      </CardContent>
      <CardFooter>
        {/* <p>{post.author ? post.author.email : "No Email"}</p> */}
        <Link href={`post/${post.id}`}>
          <Button size={"sm"}>Read...</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

