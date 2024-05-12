
import { SlashIcon } from "@radix-ui/react-icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ReactNode } from "react"

export function BreadcrumbWithCustomSeparator({ children }: { children: ReactNode }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator> */}
        {/*   <SlashIcon /> */}
        {/* </BreadcrumbSeparator> */}
        {/* <BreadcrumbItem> */}
        {/*   <BreadcrumbLink href="/components">Components</BreadcrumbLink> */}
        {/* </BreadcrumbItem> */}
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{children}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
