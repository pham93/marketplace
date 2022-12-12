import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.GOERLI_KEY as string],
    },
  },
};

export default config;
