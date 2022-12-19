import { createTheme, NextUIProvider } from '@nextui-org/react';
import {
  ThirdwebProvider,
  WalletConnector,
  InjectedConnectorType,
} from '@thirdweb-dev/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AppProps } from 'next/app';
import './styles.css';

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {},
  },
});

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

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </NextThemesProvider>
      </ThirdwebProvider>
    </SessionProvider>
  );
}

export default CustomApp;
