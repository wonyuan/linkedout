import { Flex, Box, Text, Badge } from '@mantine/core';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { Avatar } from '@mantine/core';

interface RowItemProps {
    data: any;
}

// name, about, experience, education, skills, email
const RowItem = ({data}: RowItemProps) => {
    return (
        <Flex sx={{ alignItems: "center", padding: "25px", width: "100%" }}>
        <Avatar radius="lg" size="lg" />
        <Flex direction="column" sx={{ marginLeft: "20px", flexGrow: 1 }}>
          <Flex>
            <Text size="lg" sx={{ alignItems:"flex-end", marginRight: "10px" }}>
              {data?.name}
            </Text>
            <Text size="md" color="gray" sx={{ marginTop:"3px"}}>
            {data?.email}
            </Text>
          </Flex>
          <Text size="sm" color="gray">
            {data?.desc}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: "center", flexGrow: 1, justifyContent: "flex-end" }}>
          <IconBrandLinkedin size="40px" color="#828282" stroke={1.5} />
          <Badge
            size="lg"
            color={data.score > 0.5 ? "cyan" : data.score > 0.25 ? "yellow" : "pink"}
            sx={{ marginLeft: "10px" }}
          >
            {(data?.score * 100).toFixed(2)}% MATCH
          </Badge>
        </Flex>
      </Flex>
      
    )
}

export default RowItem;