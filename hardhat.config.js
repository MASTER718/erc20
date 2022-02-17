require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');

let dotenv = require('dotenv')
dotenv.config({path:"./.env"})

require("@nomiclabs/hardhat-waffle");
const ALCHEMY_API_KEY = "GWmy_TbSbZnzj7bXtprOXD8IwqnMastX";
const ROPSTEN_PRIVATE_KEY = "0bcf0031da3f3151605730347979e2f08422dd8368ff0434180a36a730c2052b";
const mnemonic = process.env.MNEMONIC

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },


  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      //url: `HTTP://127.0.0.1:7545/${ALCHEMY_API_KEY}`,
      // accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
      chainId:31337
    },
    /*
    goerli: {
      url: "https://goerli.infura.io/v3/d3fe47cdbf454c9584113d05a918694f",
      accounts: {
        count: 1,
        initialIndex: 0,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
      chainId: 5,
    }
    */
    ropsten:{
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    },
    local:{
      url: `HTTP://127.0.0.1:7545/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
