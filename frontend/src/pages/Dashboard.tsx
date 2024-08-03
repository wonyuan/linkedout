import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Flex, Box } from '@mantine/core';
import Table from "@templates/Table";
import { NavbarMinimal } from "@molecules/Navbar";

export function Dashboard() {
  return (
    <>
      <Flex direction="row" sx={{ paddingRight: 0 }}>
        <NavbarMinimal/>
        <Flex direction="column" sx={{ width:"100%" }}>
          <Table />
        </Flex>
      </Flex>
    </>
  );
}
