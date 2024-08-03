import { Badge, Modal, Grid, Text } from "@mantine/core";

interface ModalDetailProps {
    open: boolean;
    setClose: () => void;
    data: any;
  }

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
        </Modal>
    )
};

export default ModalDetail;