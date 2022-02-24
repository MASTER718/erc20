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
    //合约方法集合体
    const CAT = await ethers.getContractFactory("CAT");
    
    //相当于合约
    const Cattoken = await MyToken.deploy();

    let token = await Cattoken.deployed();
    await writeAddr(token.address, "CAT")  
    //俩者有啥区别   地址
    console.log("CAT address:", Cattoken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });

