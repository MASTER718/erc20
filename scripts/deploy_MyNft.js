const { ethers, network } = require("hardhat");
const { writeAddr } = require('./artifact_log.js');



async function main() {
  
  let [owner] = await ethers.getSigners();
  let name = 'MyNft';
  let params = ['MyNft', "MN"];

  const MyNft = await ethers.getContractFactory(name);
  const Mynft = await MyNft.deploy(...params);    //干啥的
  let   nft   = await Mynft.deployed();           //这个搞明白
  await writeAddr(nft.address, "MyNft");
  //console.log(`${name} deployed to: ${contract.address.toLowerCase()}`);
  //tolowercase是啥
  console.log(`${name} address:`,Mynft.address);
  console.log("-------------------------------------------------");
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
