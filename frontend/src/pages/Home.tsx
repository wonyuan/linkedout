import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Flex, Box } from '@mantine/core';
import Table from "@templates/Table";
import NavbarMinimal from "@molecules/Navbar";

export function Home() {
  return (
    <>
      <Flex direction="row">
        <NavbarMinimal/>
        <Flex direction="column">
          <Table />
        </Flex>
      </Flex>
    </>
  );
}
