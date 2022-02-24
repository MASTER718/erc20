const { ethers, network } = require("hardhat");
const { writeAddr } = require('./artifact_log.js');

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log("deployer.address:"+deployer.address)
    
    console.log(
      "Deploying contracts with the account:",
      await deployer.getAddress()
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const MyToken = await ethers.getContractFactory("MyToken");
    const Mytoken = await MyToken.deploy();
    let token = await Mytoken.deployed();
    await writeAddr(token.address, "MyToken");
    console.log("MyToken address:", Mytoken.address);
    console.log("-------------------------------------------------");



//   修改
    const Storehouse = await ethers.getContractFactory("Storehouse");
    const Sh = await Storehouse.deploy(Mytoken.address);
    
    let storehouse = await Sh.deployed();
    await writeAddr(storehouse.address, "Storehouse");
    console.log("Storehouse address:", Sh.address);

    
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
