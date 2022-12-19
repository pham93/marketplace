import {
  InjectedConnectorType,
  ThirdwebProvider,
  WalletConnector,
} from '@thirdweb-dev/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const metamask: InjectedConnectorType = {
  name: 'metamask',
  options: {
    shimDisconnect: true,
  },
};

export const connectors: WalletConnector[] = [
  metamask,
  'walletConnect',
  'walletLink',
];

const AuthProvider = ({
  children,
  session,
}: React.PropsWithChildren & { session: Session }) => {
  return (
    <SessionProvider session={session}>
      <ThirdwebProvider
        desiredChainId={5}
        walletConnectors={connectors}
        authConfig={{
          // Set this to your domain to prevent signature malleability attacks.
          domain: 'localhost',
          authUrl: '/api/auth',
          loginRedirect: '/',
        }}
      >
        {children}
      </ThirdwebProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
