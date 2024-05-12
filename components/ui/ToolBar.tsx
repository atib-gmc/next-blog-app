"use client"
import { type Editor } from "@tiptap/react"
import {
  Bold,
  Strikethrough,
  Italic, List, ListOrdered, Heading2,
  Heading,
  Heading1,
  Heading3
} from "lucide-react"
import { Toggle } from "./toggle"
type props = {
  editor: Editor | null
}
export default function ToolBar({ editor }: props) {
  if (!editor) return null
  return (
    <div className="text-sm [&>*]:scale-85 flex gap-1 items-stretch">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }}
      >
        <Heading1 size={16} />
      </Toggle>



      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }}
      >
        <Heading2 size={16} />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }}
      >
        <Heading3 size={16} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run()
        }}
      >
        <Bold size={16} />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run()
        }}
      >
        <Italic size={16} />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run()
        }}
      >
        <Strikethrough size={16} />
      </Toggle>

    </div>
  )
}
