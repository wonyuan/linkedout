import {  useNavigate } from 'react-router-dom';
import { Flex, Box, Text, Badge, UnstyledButton } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { IconPointer } from '@tabler/icons-react';
import { Avatar } from '@mantine/core';

interface RowItemProps {
    setOpen: () => void;
    data: any;
}

// name, about, experience, education, skills, email
const RowItem = ({ setOpen, data}: RowItemProps) => {
  const navigate = useNavigate();
  const handleIconClick = () => {
    if (data?.url) {
      window.location.href = data?.url;
    }
  };

  return (
      <Flex sx={{ 
        cursor: "pointer", 
        alignItems: "center", 
        padding: "20px", 
        width: "100%", 
        }}>
        <Avatar radius="lg" size="lg" />
        <Flex direction="column" sx={{ marginLeft: "20px", flexGrow: 1 }}>
            <Flex>
          <Flex onClick={setOpen} sx={{ '&:hover': {
                c: '#0C8599',
                textDecoration:"underline",
              },}}>
            <Text 
              size="md" 
              sx={{ 
              alignItems:"flex-end", 
              marginRight: "3px", 
            }}>
              {data?.name}
            </Text>
            <IconPointer stroke={1.5} size="21px"/>
            </Flex>
            <Text size="sm" c="gray" sx={{ marginLeft:"10px", marginTop:"3px"}}>
            {data?.email}
            </Text>
          </Flex>
          <Text size="sm" c="gray">
            {data?.desc}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: "center", flexGrow: 1, justifyContent: "flex-end" }}>
          <UnstyledButton onClick={handleIconClick} sx={{ display: 'flex', alignItems: 'center', transition: 'color 0.3s',
              '&:hover': {
                c: '#0C8599',
              },}}>
            <IconBrandLinkedin size="40px" color="#828282" stroke={1.5} />
          </UnstyledButton>
          <Badge
            size="md"
            variant="light"
            color={data.score > 0.6 ? "cyan" : data.score > 0.25 ? "yellow" : "pink"}
            sx={{ marginLeft: "10px" }}
          >
            {(data?.score * 100).toFixed(2)}% MATCH
          </Badge>
        </Flex>
      </Flex>
      
    )
}

export default RowItem;