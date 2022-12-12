import { ethers } from 'hardhat';

async function main() {
  console.log(process.env.GOERLI_URL);
  const products = await ethers.getContractFactory('Products');
  const contract = await products.deploy();

  await contract.deployed();

  console.log(`Products is deployed to -  ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
