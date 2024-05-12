import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card'
import { Button } from '../button'

export default function PostCard(post) {
  return (
    <Card className="min-w-xl w-full" key={post.id}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.author ? post.author.name : "No Author"}</p>
      </CardContent>
      <CardFooter>
        {/* <p>{post.author ? post.author.email : "No Email"}</p> */}
        <Button size={"sm"}>Read...</Button>
      </CardFooter>
    </Card>
  )
}

