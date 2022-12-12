import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { CssBaseline, Image } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    console.log('document');
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Image
            src="/app/images/gradient-right-dark.svg"
            css={{ position: 'fixed', top: '-20%', right: '-60%' }}
            alt="top right background gradient"
          />
          <Image
            src="/app/images/gradient-left-dark.svg"
            css={{
              position: 'fixed',
              bottom: '-50%',
              right: '-50%',
              left: '-10%',
            }}
            alt="bottom left"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
