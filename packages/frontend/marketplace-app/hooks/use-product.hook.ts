import { ethers } from 'ethers';
import { Products as ProductsContract } from '@contracts';
import abi from '../contracts/products.abi.json';
import { useState } from 'react';

const contractAddress = '0x1A351a87055C333D01fc4939EAd9379c177Ca983';
const contractInterface =
  abi.output.contracts['contracts/Products.sol'].Products.abi;

export const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const buy = async () => {
    if (!window.ethereum) {
      return;
    }
    setLoading(true);
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum as any, 'any');
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      contractInterface,
      signer
    ) as ProductsContract;

    await contract
      .buy('anon', 'buy shirt', {
        value: ethers.utils.parseEther('0.0001'),
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
    contract.on('t', () => {
      setLoading(false);
    });
  };

  return {
    buy,
    setLoading,
    loading,
  };
};
