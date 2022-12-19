import { Container, Dropdown } from '@nextui-org/react';
import {
  useAddress,
  useConnect,
  useDisconnect,
  useMetamask,
} from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { Connector } from 'wagmi-core';
import { useAuth } from '../hooks/use-auth.hook';

let connecting = false;

const Web3Provider = () => {
  const {} = useAuth();
  const [
    {
      data: { connectors, connected },
    },
    connect,
  ] = useConnect();

  const { loginWithWallet, session } = useAuth();
  const address = useAddress();
  const [currentConnector, setCurrentConnector] = useState<string>(null);
  const metamaskConnect = useMetamask();
  const [dropdownDirty, setDropdownDirty] = useState(false);

  const handleConnect = async (connector: Connector) => {
    if (connecting) {
      return false;
    }
    switch (connector.name) {
      case 'MetaMask':
        await metamaskConnect();
        break;
      default:
        await connect(connector);
    }
    setCurrentConnector(connector.name);
    setDropdownDirty(true);
    connecting = false;
  };

  useEffect(() => {
    if (!connecting && address && !session && dropdownDirty) {
      loginWithWallet();
    }
  }, [address, dropdownDirty]);

  return (
    <>
      <Dropdown>
        <Dropdown.Button className="yo" id="nmnm" color="secondary">
          {currentConnector ?? 'Connect Wallet'}
        </Dropdown.Button>
        <Dropdown.Menu
          color="secondary"
          id="menu"
          selectionMode="single"
          selectedKeys={[currentConnector]}
        >
          {connectors.map((connector) => {
            if (!connector.ready) {
              return null;
            }
            return (
              <Dropdown.Item key={connector.id} textValue={connector.name}>
                <Container onClick={() => handleConnect(connector)}>
                  {connector.name}
                </Container>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const Web3Login = () => {
  return <Web3Provider />;
};
export default Web3Login;
