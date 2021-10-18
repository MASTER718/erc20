const crowd = artifacts.require("MyToken")
module.exports = function(deployer) {
  deployer.deploy(crowd);
};

