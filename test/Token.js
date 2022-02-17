
const { expect } = require("chai");

describe("Token contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;   //js动态类型语言

  beforeEach(async function () {
  
    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy(); 
  });

 

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      
      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

 

    
  });
});

//await ?   操作线程池异步操作等待完成
//



//const { expect } = require("chai"); //引入断言库
/*
describe("Token contract", function() {


//分为不同的it模块

  it("Deployment should assign the total supply of tokens to the owner", async function() {
    const accounts = await ethers.getSigners();
owner = accounts[0]

    const Token = await ethers.getContractFactory("MyToken");

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });





}); */