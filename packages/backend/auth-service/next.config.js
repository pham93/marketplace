//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  async rewrites() {
    return [
      {
        source: '/rest/api/:path*',
        destination: `${process.env.API_GATEWAY_URL}/api/:path*`,
      },
      {
        source: '/app/:path*',
        destination: 'http://localhost:5001/app/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app/products',
        permanent: true,
      },
    ];
  },
};

module.exports = withNx(nextConfig);
