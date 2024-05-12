"use client"
import React, { useLayoutEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
// import {  } from '@tiptap/exte'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from "@tiptap/extension-placeholder"
import ToolBar from './ToolBar'
import { Separator } from './separator'

export default function TextEditor({ reset, onChange, description }: { onChange: (text: string) => void, description: string, reset: boolean }) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: 'my-custom-is-empty-class',
        placeholder: "write your article",
        showOnlyCurrent: false,
        includeChildren: true,
      })
    ],
    editorProps: {
      attributes: {
        class: "prose mt-2 no-scrollbar overflow-y-scroll h-[13rem] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },


    content: description
  })
  React.useEffect(() => {
    if (reset) editor?.commands.setContent("")
  }, [reset])

  return (
    <div className="container  p-0 w-full">
      <div className="toolbar border  p-1 rounded-md ">
        <ToolBar editor={editor} />
      </div>
      <div className="editor">
        <EditorContent placeholder='write your article' editor={editor} />
      </div>
    </div>
  )
}

