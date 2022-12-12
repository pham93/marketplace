import { Container, Row } from '@nextui-org/react';
import { ProductCard } from '../components/ProductCard';

export interface Product {
  name: string;
  image: string;
  stock: 'Sold Out' | 'Buy' | 'Soon';
}

export function Products() {
  const items = [
    {
      name: 'Red T-shirt',
      image:
        'https://cdn.shopify.com/s/files/1/2072/5133/products/OF_Tee_Red_1200x1200.jpg?v=1603829964',
      stock: 'Sold Out',
    },
    {
      name: 'Blue T-shirt',
      image: 'https://mv.unitheme.net/images/detailed/1/t-7.jpg',
      stock: 'Buy',
    },
    {
      name: 'Green T-shirt',
      image:
        'http://cache.mrporter.com/variants/images/43769801097207191/in/w2000_q60.jpg',
      stock: 'Buy',
    },
    {
      name: 'Yellow T-shirt',
      image:
        'https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg',
      stock: 'Soon',
    },
  ] as Product[];

  return (
    <Container
      alignItems="center"
      justify="center"
      display="flex"
      css={{ height: '100vh', display: 'flex' }}
    >
      <Row justify="center" align="center">
        {items.map((item) => {
          return <ProductCard key={item.name} product={item} />;
        })}
      </Row>
    </Container>
  );
}
export default Products;
