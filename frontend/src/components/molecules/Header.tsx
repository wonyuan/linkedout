import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

interface HeaderProps {
  title: string;
  desc: string;
  handleAction: () => void;
}

const Header = ({ title, desc, handleAction }: HeaderProps) => {
  return (
    <Flex justify="space-between" gap="80px" align="center">
      <Flex direction="column">
        <Text c="#414141" fz="xl" fw={700}>
          {title}
        </Text>
        <Text c="#414141" fz="sm">
          {desc}
        </Text>
      </Flex>
      <ActionIcon onClick={handleAction}>
        <IconReload />
      </ActionIcon>
    </Flex>
  );
};

export default Header;
