/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Button, Flex } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { useMessages } from '@context/messageContext';

const textEditorStyles = css`
  .ProseMirror:focus {
    outline: none;
  }
`;

interface TextMessagesProps {
    message: string;
    messageKey: number;
  }
  
  function TextMessages(props: TextMessagesProps) {
    const { deleteMessage } = useMessages(); 
    const { message, messageKey } = props;
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

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log(messageKey);
    deleteMessage(messageKey); 
  };

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Flex direction="row">
                <RichTextEditor
                    editor={editor}
                    css={textEditorStyles}
                    style={{
                        paddingLeft: '30px',
                        minHeight: '10%',
                        minWidth: '94%', 
                    }}
                >
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    </RichTextEditor.Toolbar>
                    <RichTextEditor.Content />
                </RichTextEditor>
                <Flex direction="column" justify="center" align="center" >
                    <Button onClick={handleCopy} style={{ marginLeft: '8px', marginBottom: '8px'}}>
                        <IconCopy stroke={2} />
                    </Button>
                    <Button variant="light" onClick={handleDelete} style={{ marginLeft: '8px' }}>
                        <IconSquareRoundedXFilled />
                    </Button>
                </Flex>
            </Flex>
        </div>

  );
}

export default TextMessages;
