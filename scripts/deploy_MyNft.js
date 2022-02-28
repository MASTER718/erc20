const hre = require("hardhat");

async function main() {
  let [owner] = await ethers.getSigners();

  let name = 'MyNft';
  let params = ['MyNft', "MN"];
  const Contract = await hre.ethers.getContractFactory(name);
  const contract = await Contract.deploy(...params);
  await contract.deployed();
  console.log(`${name} deployed to: ${contract.address.toLowerCase()}`);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
