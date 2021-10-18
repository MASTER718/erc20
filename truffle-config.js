const mnemonic = ""


module.exports = {

  compilers: {
    solc: {
      version: "0.8.0",
      }
    },


  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 6721975
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/d3fe47cdbf454c9584113d05a918694f")
      },
      network_id: 3,
      gas: 7003605,
      gasPrice: 10000000000,  // 10Gwei
    },
    main: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/d3fe47cdbf454c9584113d05a918694f")
      },
      network_id: 1,
      gas: 7003605,
      gasPrice: 10000000000,   // 10Gwei
    }
  }
}