import { Suspense } from "react";
import React from "react"
import Image from "next/image";
import PostCardContainer from "./components/PostCardContainer";

export default async function Home() {
  return (
    <div className="min-h-screen   mx-auto dark w-full">
      <div className="container flex-wrap w-full flex gap-3 ">
        <div className="hero w-full  relative hidden md:block">
          <div className="absolute w-full h-full bg-black/50 inset-0 grid place-items-center backdrop-blur-xs">
            <h2 className="text-3xl font-semibold ">Explore Your Dream</h2>
          </div>
          <Image src="/assets/download.jpeg" alt="hero" width={1000} className="max-h-[500px]  bg-cover w-full" height={200} />
        </div>
        <h2 className="text-2xl my-2">Latest Posts</h2>
        <div className="post-conteiner flex-wrap w-full flex gap-5">
          <Suspense fallback={<h3>Loading...</h3>}>
            <PostCardContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
