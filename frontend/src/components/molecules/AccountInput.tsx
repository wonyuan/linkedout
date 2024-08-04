import { TextInput, rem, Flex, Text } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { IconGhost2Filled } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import {useState} from "react";
import api from "../../../api/axiosInstance";

export function AccountInput() {
  
  const [linkedinURL, setLinkedinURL] = useState<string>("");
  
  const handleSearch = async () => {
    try {
      const response = await api.post('/api/linkedinURL', {linkedinURL});
      print(response.data.name);

    } catch (error) {
      console.error('Error logging in', error);
 
    }
  };
  const icon = <IconBrandLinkedin style={{ width: rem(16), height: rem(16) }} />;
  return (
    <Flex direction="column" sx={{ minHeight: '100vh' }} justify="center" align="center" gap="md"> 
      <Flex direction="column" align="center" sx={{ marginBottom: '20px' }}>
        <Flex direction="row" align="center">
          <IconGhost2Filled color="#1098AD" size={70} />        
          <Text size="xl" fw={700} c="#414141" sx={{ marginLeft: '10px', fontSize: rem(70)}}>
            linkedOutReach
          </Text>
        </Flex>
        <Text size="lg" fw={500} c="#414141" sx={{ marginTop:'-15px'}}>
        Your professional match is just a ghost away!
        </Text>
      </Flex>
      <Flex direction="row" gap="xs" >
      <TextInput 
        value = {linkedinURL}
        onChange= {(e) => setLinkedinURL(e.target.value)}
        c="#414141" 
        fz="xl" 
        fw={300}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Please enter your linkedin"
        placeholder="username@linkedin.com"
        sx={{ width: '500px' }}
        labelProps={{ style: { fontWeight: 500, fontSize: rem(18), color: "#414141" } }}
      />
      <Button onClick={handleSearch} variant="filled" sx={{ marginTop:"30px"}}>Search</Button>
      </Flex>
    </Flex>
  );
}

