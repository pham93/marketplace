import { Row } from '@nextui-org/react';
import axios, { AxiosResponse } from 'axios';
import { use } from 'react';
import { Box } from '../components/Box';
import { ProductCard } from '../components/ProductCard';

const getProducts = async () =>
  await axios.get<Product[]>('/api/products', {
    withCredentials: true,
    baseURL: process.env.API_GATEWAY_URL,
  });

export interface Product {
  id: string;
  name: string;
  image: string;
  stock: 'Sold Out' | 'Buy' | 'Soon';
}

interface ProductPageProps {
  products: Product[];
}

export function Products({ products }: ProductPageProps) {
  return (
    <Box
      css={{
        height: '100vh',
        display: 'flex',
        padding: 0,
        maxWidth: '100% !important',
      }}
    >
      <Row justify="center" align="center">
        {products?.map((item) => {
          return <ProductCard key={item.name} product={item} />;
        })}
      </Row>
    </Box>
  );
}
export default Products;

export async function getServerSideProps<ProductPageProps>(context) {
  const response = await getProducts();
  const products = response.data;
  return {
    props: { products }, // will be passed to the page component as props
  };
}
