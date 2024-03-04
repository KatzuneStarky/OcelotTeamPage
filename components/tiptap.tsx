"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toolbar } from "./toolbar"
import Heading from "@tiptap/extension-heading"

export default function TipTap({
    description,
    onChange
}: {
    description: string,
    onChange: (richText: string) => void
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-xl font-bold",
                    levels: [2]
                }
            })
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[150px] border-input bg-back"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        }
    })

  return (
    <div className="flex flex-col min-h-[250px]">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}
