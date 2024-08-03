import { useMessages } from "@context/messageContext";
import { Box, Flex, Text, Badge, Divider } from "@mantine/core";
import TextMessages from "@molecules/TextMessages";

const TextCard = () => {
    const { messages } = useMessages();

    return (
      <>
      <Box sx={{ marginTop: '35px', paddingBottom: '50px' }}>
        <Badge size="lg">
        ♥ message templates
        </Badge>
        <Box
            sx={{
                border: '2px solid #E0E0E0',
                borderRadius: '10px',
                padding: '10px 20px',
                marginTop: '8px',
            }}
        >
            {messages.length === 0 ? (
                <Text>No messages saved yet.</Text>
            ) : (
                messages.map((message, index) => (
                    <>
                    <TextMessages key={index} message={message.content} messageKey={index} />
                    <Divider my="md" />
                    </>
                ))
            )}
          </Box>
        </Box>
      </>
    );
};

export default TextCard;
