/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Button, Flex } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { IconTableHeart } from '@tabler/icons-react';

interface TextEditorProps {
  message: string;
  onSave: (content: string) => void; // Accept a callback prop
}

const textEditorStyles = css`
  .ProseMirror:focus {
    outline: none;
  }
`;

function TextEditor({ message, onSave }: TextEditorProps) {
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

  const handleSave = () => {
    if (editor) {
      const currentContent = editor.getHTML();
      onSave(currentContent); 
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Flex direction="row">
                <RichTextEditor
                    editor={editor}
                    css={textEditorStyles}
                    style={{
                        minHeight: '10%', 
                        minWidth: '450px', 
                    }}
                >
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    </RichTextEditor.Toolbar>
                    <RichTextEditor.Content />
                </RichTextEditor>
                <Flex direction="column">
                    <Button onClick={handleCopy} style={{ marginLeft: '8px' }}>
                        <IconCopy stroke={2} />
                    </Button>
                    <Button onClick={handleSave} variant="light" style={{ marginLeft: '8px', marginTop: '8px' }}>
                        <IconTableHeart stroke={2} />
                    </Button>
                </Flex>
            </Flex>
        </div>
  );
}

export default TextEditor;
