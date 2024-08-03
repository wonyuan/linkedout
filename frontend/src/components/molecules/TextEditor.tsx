import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';

interface TextEditorProps {
    message: string;
};

function TextEditor({message}: TextEditorProps) {
  const content = `<p> ${message}</p>`;
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export default TextEditor;