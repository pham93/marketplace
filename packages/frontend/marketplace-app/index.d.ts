import { MetaMaskInpageProvider } from '@metamask/providers';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
