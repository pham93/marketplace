import detectProvider from '@metamask/detect-provider';
import axios, { AxiosResponse } from 'axios';
import { WalletLoginData } from '@sharedto/auth-service';

import { useMemo } from 'react';
import { useRouter } from 'next/router';

export function useConnect() {
  const router = useRouter();
  const check = useMemo(() => {
    return async () => {
      const provider = await detectProvider();
      if (!provider || !window.ethereum) {
        return;
      }
      // has provider do things here
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!window.ethereum.selectedAddress) {
        return;
      }

      const nonceResponse = await axios.get('/api/auth/nonce');

      const cred = (await window.ethereum.request<string>({
        method: 'personal_sign',
        params: [nonceResponse.data, window.ethereum.selectedAddress],
      })) as string;

      const loginResponse = await axios.post<
        string,
        AxiosResponse<string>,
        WalletLoginData
      >(`/api/auth/walletlogin`, {
        address: window.ethereum.selectedAddress,
        signature: cred,
      });
      //security risk, xss attack, but whatever for now.
      sessionStorage.setItem('key', loginResponse.data);

      router.push('/products');
    };
  }, []);

  return {
    check,
  };
}
