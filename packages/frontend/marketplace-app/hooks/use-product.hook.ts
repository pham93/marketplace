import { ethers } from 'ethers';
// import { Products as ProductsContract } from '@contracts';
import abi from '../contracts/products.abi.json';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Order, Prisma } from '@prisma/client';

const contractAddress = '0x1A351a87055C333D01fc4939EAd9379c177Ca983';
const contractInterface =
  abi.output.contracts['contracts/Products.sol'].Products.abi;

const updateOrder = async (order: Prisma.OrderUncheckedCreateInput) => {
  await axios.post<
    Order,
    AxiosResponse<Order>,
    Prisma.OrderUncheckedCreateInput
  >('/rest/api/order', order, { withCredentials: true });
};

export const useProduct = () => {
  const [loading, setLoading] = useState(false);

  const buy = async (productId: string, address) => {
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
    );

    const buyItem = await contract
      .buy('anon', 'buy shirt', {
        value: ethers.utils.parseEther('0.0001'),
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
    await updateOrder({
      productId,
      quantity: 1,
      status: 'PENDING',
      transaction: buyItem.hash,
      userId: address,
    });

    contract.on('t', async () => {
      setLoading(false);
      await updateOrder({
        productId,
        quantity: 1,
        status: 'SUCCESSFUL',
        transaction: buyItem.hash,
        userId: address,
      });
    });
  };

  return {
    buy,
    setLoading,
    loading,
  };
};
