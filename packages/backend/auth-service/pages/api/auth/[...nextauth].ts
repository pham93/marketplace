import { Prisma } from '@prisma/client';
import { ThirdwebNextAuth } from '@thirdweb-dev/auth/next-auth';
import { AuthOptions } from 'next-auth';
import { prisma } from '../../../server/primsa-client';

export const authOptions: AuthOptions = {
  providers: [],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      const dbAccount: Prisma.AccountCreateWithoutUserInput = {
        providerAccountId: account.providerAccountId,
        expires_at: account.expires_at,
        provider: account.provider,
        type: account.type,
      };
      /**
       * Store the user in the database
       */
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (!dbUser) {
        await prisma.user.create({
          data: { id: user.id, accounts: { create: dbAccount } },
        });
      }
      return true;
    },
  },
};

export const { NextAuthHandler, getUser } = ThirdwebNextAuth({
  // Learn how to store your private key securely:
  // https://portal.thirdweb.com/sdk/set-up-the-sdk/securing-your-private-key
  privateKey: process.env.THIRD_WEB_AUTH_KEY || '',

  // Set this to your domain to prevent signature malleability attacks.
  domain: 'localhost',
  // And we can add in any additional next auth configuration we want to use
  nextOptions: authOptions,
});

export default NextAuthHandler();
