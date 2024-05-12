'use client'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Paragraph from "@tiptap/extension-paragraph"
const Tiptap = ({ description, onChange, editor }: { editor: Editor, description: string, onChange: (text: string) => void }) => {

  return (

    <div className="unreset">


      <div>
      </div>
    </div>
  )
}

export default Tiptap
