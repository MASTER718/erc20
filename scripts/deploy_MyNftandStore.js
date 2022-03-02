

const { ethers, network } = require("hardhat");
const { writeAddr } = require('./artifact_log.js');

async function main() {
  
  //得到用户签名器
  let [owner] = await ethers.getSigners();
  console.log(owner.address)
  console.log(await owner.getAddress())


  //MyNft合约具体部署
  let name = 'MyNft';
  let params = ['MyNft', "MN"];

  const MyNft = await ethers.getContractFactory(name);
  const Mynft = await MyNft.deploy(...params);    
  let   nft   = await Mynft.deployed();           
  await writeAddr(nft.address, "MyNft");
  //console.log(`${name} deployed to: ${contract.address.toLowerCase()}`);
  //tolowercase？
  console.log(`${name} address:`,Mynft.address);
  console.log("-------------------------------------------------");


  //Store_Nft的具体部署

    const Store_Nft = await ethers.getContractFactory("Store_Nft");
    const Store_nft = await Store_Nft.deploy(nft.address);                //传入
    let storenft = await Store_nft.deployed();
    await writeAddr(storenft.address, "Store_Nft");

    console.log("Store_Nft address:", storenft.address);
    console.log("验证 deployed address:", Store_nft.address);
    console.log("-------------------------------------------------");




}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
