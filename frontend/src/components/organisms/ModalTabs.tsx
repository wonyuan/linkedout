import { useState } from 'react';
import { Tabs, Text, Box } from '@mantine/core';

const data = {
  matchingLikes: [
    'hiking', 'react', 'software engineer', 'biology', 'travelling', 'photography'
  ]
}

function ModalTabs() {
  const [activeTab, setActiveTab] = useState<string | null>('about');

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="about" sx={{ width:"50%" }}>About</Tabs.Tab>
        <Tabs.Tab value="common" sx={{ width:"50%" }}>In Common</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="about">
      <Box bg="cyan.0"  sx={{ padding:'10px', paddingLeft:'25px', marginTop:'20px', borderRadius:'10px'}}>
      <Text >
        Wonderful
        </Text>
         {/*
         conjure up a summary of the user's profile here
         section for education, experience, skills (techstack), volunteering (if applicable)
         */}
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="common">
        <Box bg="cyan.0"  sx={{ padding:'10px', paddingLeft:'25px', marginTop:'20px', borderRadius:'10px'}}>
        <Text sx={{marginTop:'20px'}}>
        Here are some matching keywords we found in your profiles:
        </Text>
        <ol>
         {data.matchingLikes.map((like, index) => (
           <li key={index}>{like}</li>
         ))}
       </ol>
       </Box>
      </Tabs.Panel>
    </Tabs>
  );
}

export default ModalTabs;