import { useState } from 'react';
import { Flex, Box, Badge } from '@mantine/core';
import Loader from '@atoms/Loader';
import RowItem from "@atoms/RowItem";
import SlideDrawer from '@organisms/SlideDrawer';

const mockUser = {
    name: "Gregory Lane",
    interests: ["hiking", "horror movies", "tech"],
}

const mockData = [
    {
        name: "John Doe",
        email: "johndoe@linkedin.com",
        desc: "avid lover of all things tech, hiking in san paulo, and ranking horror movies on how badly they ruin my sleep schedule",
        url: "https://www.linkedin.com/in/johndoe",
        score: 0.76,
    },
    {
        name: "Ann Wheeler",
        email: "annwheeler@linkedin.com",
        desc: "avid lover of all things tech, hiking in san paulo, and ranking horror movies on how badly they ruin my sleep schedule",
        url: "https://www.linkedin.com/in/johndoe",
        score: 0.52,
    },
    {
        name: "Paulo Smith",
        email: "paulydoeswheelies@linkedin.com",
        desc: "avid lover of all things tech, hiking in san paulo, and ranking horror movies on how badly they ruin my sleep schedule",
        url: "https://www.linkedin.com/in/johndoe",
        score: 0.22,
    }
]

const TableRows = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  return (
    <Box >
      <Loader />
      <SlideDrawer
          open={!!open}
          setClose={() => {
            setOpen(null);
            setIndex(null); 
          }}
          data={index !== null ? mockData[index] : null}
        />
        <Badge size="lg">
            Matches
        </Badge>
        <Box
        sx={{
          border: '2px solid #E0E0E0',
          borderRadius: '10px',
          padding: '10px 20px 10px 20px',
          marginTop: '5px',
        }}
      >
        {mockData.map((data, idx) => (
        <Flex
          direction="row"
          gap="8px"
          sx={{
          height: "100px",
          width: "100%",
          overflowY: "auto",
          marginTop: "10px",
          marginBottom: "10px",
          border: "1px #E0E0E0",
          padding: "12px",
          borderRadius: "7.5px",
          backgroundColor: "#F3F4F8",
          transition: 'box-shadow 0.3s, opacity 0.3s',
          '&:hover': {
            boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
            opacity: 0.95,
          },
        }}
        key={idx}
        >
          <RowItem 
            setOpen={() => {
              setOpen(data.name); 
              setIndex(idx); 
            }}  
            data={data}/>
        </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default TableRows;