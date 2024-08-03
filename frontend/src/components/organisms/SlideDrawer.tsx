import { Badge, Modal, Grid, Text } from "@mantine/core";

interface SlideDrawerProps {
    open: boolean;
    setClose: () => void;
    data: any;
  }

const SlideDrawer = ({ open, setClose, data }: SlideDrawerProps) => {
    return (
        <Modal
            title={data?.name}
            padding="xl"
            size="xl"
            opened={open}
            // position="right"
            onClose={setClose}
            overlayProps={{ opacity: 0.4, blur: 1 }}
            >
        </Modal>
    )
};

export default SlideDrawer;