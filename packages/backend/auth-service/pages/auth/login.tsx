import { Card, Col, Container, CSS, Row, Text } from '@nextui-org/react';
import { unstable_getServerSession } from 'next-auth';
import Web3Login from '../../components/Web3Login';
import { authOptions } from '../api/auth/[...nextauth]';

const LoginCard = ({ css }: { css?: CSS }) => {
  return (
    <Card css={{ width: '300px', height: '400px', ...css }}>
      <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
        <Text weight="bold" transform="uppercase" color="#ffffffAA">
          Metamask
        </Text>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          showSkeleton={true}
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
        <Row>
          <Col>
            <Web3Login />
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

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
