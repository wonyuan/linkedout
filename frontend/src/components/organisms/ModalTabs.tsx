import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';

const data = {
  matchingLikes: [
    'hiking', 'react', 'software engineer', 'biology', 'travelling', 'photography'
  ]
}

function ModalTabs() {
  return (
    <>
    <Tabs radius="xl" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="about" sx={{ width: "50%"}}>About</Tabs.Tab>
        <Tabs.Tab value="common" sx={{ width: "50%"}}>In common</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="about" pt="xs">
        about
        {/*
        conjure up a summary of the user's profile here
        section for education, experience, skills (techstack), volunteering (if applicable)
        */}
      </Tabs.Panel>

      <Tabs.Panel value="common" pt="xs">
        Here are some matching keywords we found in your profiles:
        <ol>
        {data.matchingLikes.map((like, index) => (
          <li key={index}>{like}</li>
        ))}
      </ol>
      </Tabs.Panel>
    </Tabs>
    </>
  );
}

export default ModalTabs;