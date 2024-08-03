import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconLogout,
  IconGhost2Filled
} from '@tabler/icons-react';
import classes from './NavbarMinimal.module.css';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function Navbar({ icon: Icon, label, active, onClick }: NavbarProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', route: '/home' },
  { icon: IconGauge, label: 'Dashboard', route: '/dashboard' },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();

  const handleNavigate = (route: string, index: number) => {
    setActive(index);
    navigate(route);
  };

  const links = mockdata.map((link, index) => (
    <Navbar
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleNavigate(link.route, index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <IconGhost2Filled size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <Navbar icon={IconLogout} label="Logout" onClick={() => navigate('/')} />
      </Stack>
    </nav>
  );
}

export default NavbarMinimal;
