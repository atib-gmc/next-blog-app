"use client"
import { FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon } from "react-share";

export function ShareFacebook() {
  return (
    <FacebookShareButton

      url="facebook.com"
    >
      <FacebookIcon size={32} className="rounded-full" />
    </FacebookShareButton>
  )
}



export function ShareTwitter() {
  return (
    <TwitterShareButton
      url="facebook.com"
    >
      <TwitterIcon size={32} className="rounded-full" />
    </TwitterShareButton>
  )
}

