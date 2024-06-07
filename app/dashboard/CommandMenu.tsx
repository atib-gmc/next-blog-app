"use client"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
  ActivityLogIcon
} from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useRouter, usePathname } from "next/navigation"

export function CommandMenu() {
  const pathName = usePathname()
  const router = useRouter()
  return (
    <Command className=" shadow-md">
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <CommandGroup>
        {/* <CommandEmpty>No results found.</CommandEmpty> */}
        <CommandList className="space-y-5" >
          <CommandItem className="text-sm" disabled={!pathName.includes("/my-post")} onSelect={() => router.push("/dashboard")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="truncate">Create Post</span>
          </CommandItem>
          <CommandItem disabled={pathName.includes("/my-post")} onSelect={() => router.push("dashboard/my-post")}>
            <ActivityLogIcon className="mr-2 h-4 w-4" />
            <span className="truncate">My Article</span>
          </CommandItem>
          {/* <CommandItem onSelect={() => router.push("/")}> */}
          {/*   <RocketIcon className="mr-2 h-4 w-4" /> */}
          {/*   <span>Launch</span> */}
          {/* </CommandItem> */}
        </CommandList>
        <CommandSeparator />
      </CommandGroup>
    </Command >
  )
}
