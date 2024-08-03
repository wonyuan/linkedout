import { Badge, Modal, Grid, Text } from "@mantine/core";
import TextEditor from "@molecules/TextEditor";

interface ModalDetailProps {
    open: boolean;
    setClose: () => void;
    data: any;
  }

const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

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
              <Text size="xl" c="#343A40" fw={700}>
                {data?.name}
              </Text>
              <Text c="#495057">
                {data?.desc}
              </Text>
              <TextEditor message={message}/> 
        </Modal>
    )
};

export default ModalDetail;