import { Modal, Grid, Text, Flex, Box } from "@mantine/core";
import TextEditor from "@molecules/TextEditor";

interface ModalDetailProps {
    open: boolean;
    setClose: () => void;
    data: any;
  }

const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

const ModalDetail = ({ open, setClose, data }: ModalDetailProps) => {
    return (
        <Modal
            title="USER DETAILS"
            padding="xl"
            size="lg"
            opened={open}
            // position="right"
            onClose={setClose}
            overlayProps={{ opacity: 0.4, blur: 1 }}
            >
              <Flex direction="column" sx={{ marginBottom: "5px" }}>
                <Text size="xl" c="#343A40" fw={700}>
                  {data?.name}
                </Text>
                <Text c="#495057">
                  {data?.desc}
                </Text>
              </Flex>
              <Box
                sx={{
                  border: '2px solid #E0E0E0',
                  borderRadius: '10px',
                  padding: '10px 20px 10px 20px',
                  marginTop: '5px',
                }}>              
                <TextEditor message={message}/>
              </Box>
        </Modal>
    )
};

export default ModalDetail;