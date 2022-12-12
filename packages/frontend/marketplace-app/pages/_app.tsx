import { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Head from 'next/head';
import './styles.css';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Transition from '../animation/Transition';

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

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to marketplace-app!</title>
      </Head>
      <main className="app">
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            <Transition>
              <Component {...pageProps} />
            </Transition>
          </NextUIProvider>
        </NextThemesProvider>
      </main>
    </>
  );
}

export default CustomApp;
