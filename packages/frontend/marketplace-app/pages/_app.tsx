import { createTheme, NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import Transition from '../animation/Transition';
import Header from '../components/Header';
import './styles.css';

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  className: 'theme-light',
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: 'dark',
  className: 'theme-dark',
  theme: {
    colors: {},
  },
});

const AuthProvider = dynamic(
  async () => await import('../components/AuthProvider'),
  {
    suspense: true,
  }
);

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to marketplace-app!</title>
      </Head>
      <main className="app">
        <AuthProvider session={session}>
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
                <Header />
                <Component {...pageProps} />
              </Transition>
            </NextUIProvider>
          </NextThemesProvider>
        </AuthProvider>
      </main>
    </>
  );
}

export default CustomApp;
