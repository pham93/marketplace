import { Button, Link, Navbar } from '@nextui-org/react';
import { useDisconnect } from '@thirdweb-dev/react';
import { signOut } from 'next-auth/react';

const Header = () => {
  const disconnect = useDisconnect();
  const handleSignout = async () => {
    await disconnect();
    await signOut();
  };
  return (
    <Navbar variant={'floating'}>
      <Navbar.Content></Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat as={Link} onClick={() => handleSignout()}>
            Logout
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default Header;
