import { useAddress, useDisconnect, useSDK } from '@thirdweb-dev/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useAuth() {
  const sdk = useSDK();
  const address = useAddress();
  const { data: session } = useSession();
  const disconnect = useDisconnect();
  const router = useRouter();

  const loginWithWallet = async () => {
    if (!address) {
      return;
    }
    // Set this to your domain to prevent signature malleability attacks.
    try {
      const domain = 'localhost';
      const payload = await sdk?.auth.login(domain);
      // And then we pass it into the next-auth signIn function

      await signIn('credentials', {
        payload: JSON.stringify(payload),
        redirect: true,
        callbackUrl: router.query.callbackUrl as string,
      });
    } catch (e) {
      console.error('Failed to login, disconnecting...');
      await disconnect();
      window.location.reload();
    }
  };

  return {
    loginWithWallet,
    address,
    session,
  };
}
