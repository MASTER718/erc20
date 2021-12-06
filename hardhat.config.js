require("@nomiclabs/hardhat-waffle");

let dotenv = require('dotenv')
dotenv.config({path:"./.env"})


const mnemonic = process.env.MNEMONIC

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    dev: {
      url: "http://127.0.0.1:7545"
    },
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
  }
};
