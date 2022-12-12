import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
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

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
