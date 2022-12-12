import { Row, Card, Text, Col, Button, Loading } from '@nextui-org/react';
import { useEffect } from 'react';
import { useProduct } from '../hooks';
import { Product } from '../pages/products';

export const ProductCard = ({ product }: { product: Product }) => {
  const { buy, loading } = useProduct();

  useEffect(() => {
    console.log('loading', loading);
  }, [loading]);
  return (
    <Card css={{ width: '300px', height: '400px', margin: '1rem' }}>
      <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
        <Text weight="bold" transform="uppercase" color="#333333">
          {product.name}
        </Text>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={product.image}
          width="100%"
          height="100%"
          objectFit="cover"
        ></Card.Image>
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: 'absolute',
          bgBlur: '#ffffff66',
          borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
          background: 'rgb(2 4 6 / 94%)',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row justify="space-between">
          <Col css={{ flex: 3 }}>Login with metamask</Col>
          <Col css={{ flex: 1 }}>
            <Button
              flat
              auto
              rounded
              bordered
              color="gradient"
              onPress={buy}
              disabled={product.stock !== 'Buy'}
            >
              {loading && (
                <Loading
                  css={{ marginRight: '5px !important' }}
                  type="spinner"
                  color="currentColor"
                  size="sm"
                />
              )}
              <Text
                css={{ color: 'inherit' }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                {product.stock}
              </Text>
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
