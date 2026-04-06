import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor({ content, setContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); 
    },
  });

  return (
    <div className="bg-white text-black p-4 rounded-lg">
      <EditorContent editor={editor} />
    </div>
  );
}