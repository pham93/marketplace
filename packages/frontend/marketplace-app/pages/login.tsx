import {
  Button,
  Card,
  Row,
  Col,
  Container,
  Text,
  CSS,
} from '@nextui-org/react';
import { useConnect } from '../hooks';

const LoginCard = ({ css }: { css?: CSS }) => {
  const { check } = useConnect();
  return (
    <Card css={{ width: '300px', height: '400px', ...css }}>
      <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
        <Text weight="bold" transform="uppercase" color="#ffffffAA">
          Metamask
        </Text>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src="https://assets.hongkiat.com/uploads/metamask-alternatives/metamask.svg"
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
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row justify="space-between">
          <Col css={{ flex: 3 }}>Login with metamask</Col>
          <Col css={{ flex: 1 }}>
            <Button flat auto rounded color="secondary" onClick={check}>
              <Text
                css={{ color: 'inherit' }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Login
              </Text>
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export function Login() {
  return (
    <Container
      css={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginCard css={{ marginBottom: '200px' }} />
    </Container>
  );
}

export default Login;
