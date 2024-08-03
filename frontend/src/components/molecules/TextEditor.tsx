/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { Box, Flex } from '@mantine/core';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';

interface TextEditorProps {
  message: string;
}

const textEditorStyles = css`
  .ProseMirror:focus {
    outline: none;
  }
`;

function TextEditor({ message }: TextEditorProps) {
  const content = `<p>${message}</p>`;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  const handleCopy = () => {
    if (editor) {
      navigator.clipboard.writeText(editor.getHTML());
    }
  };

  return (
    <div>
        <Flex direction="row">  
            <RichTextEditor editor={editor} css={textEditorStyles}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
            <Button onClick={handleCopy} sx={{ marginLeft:"20px"}}>
                <IconCopy stroke={2} size="60px"/>      
            </Button>
        </Flex>   
    </div>
  );
}

export default TextEditor;
