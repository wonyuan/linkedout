import { Flex, Box } from '@mantine/core';
import Loader from '@atoms/Loader';
import RowItem from '../atoms/RowItem';

const mockData = {
    name: "John Doe",
    email: "johndoe@linkedin.com",
    desc: "avid lover of all things tech, hiking in san paulo, and ranking horror movies on how badly they ruin my sleep schedule",
    url: "https://www.linkedin.com/in/johndoe",
    score: 0.76,
}

const TableRows = () => {
  return (
    <Box>
      <Loader />
        <Flex
          direction="row"
          gap="8px"
          sx={{
          height: "125px",
          width: "100%",
          overflowY: "auto",
          marginTop: "4px",
          border: "1px #E0E0E0",
          padding: "12px",
          borderRadius: "7.5px",
          backgroundColor: "#F3F4F8",
        }}
        >
            <RowItem data={mockData}/>
        </Flex>
    </Box>
  );
};

export default TableRows;