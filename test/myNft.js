const { expect } = require("chai");
const { ethers } = require("hardhat");
let contract;
let contractAddr;
const NAME = 'MyNft';
const SYMBOL = 'MN'
const baseURI = 'https://mydomain.com/';

async function init() {
    accounts = await ethers.getSigners();
    owner = accounts[0];

    let name = 'MyNft'
    const Contract = await hre.ethers.getContractFactory(name);
    let params = [NAME, SYMBOL];
    contract = await Contract.deploy(...params);
    await contract.deployed();
    // console.log(`${name} deployed to: ${contract.address}`);

    contractAddr = contract.address.toLowerCase();
    // console.log('====contractAddr====', contractAddr);
}

describe.only("MyNft", function () {

    before(async function () {
        await init();
    });

    it("name", async function () {
        expect(await contract.name()).to.equal(NAME);
    });

    it("symbol", async function () {
        expect(await contract.symbol()).to.equal(SYMBOL);
    });

    it("mint", async function () {
        await contract.connect(owner).mint();
        let balance = await contract.balanceOf(owner.address);
        expect(balance).to.equal(1);

        let tokenOwner = await contract.ownerOf(1);
        expect(tokenOwner).to.equal(owner.address);
    });

    it("approve", async function () {
        let user = accounts[1];
        await contract.connect(owner).mint();

        let totalSupply = await contract.totalSupply(); // 也就是刚刚铸造的tokenId
        let tokenId = totalSupply;

        await contract.connect(owner).approve(user.address, tokenId);
        let approvedAddr = await contract.getApproved(tokenId);
        expect(approvedAddr).to.equal(user.address);
    });

    it("approveForAll&isApprovedForAll", async function () {
        let user = accounts[2];

        let isApprovedForAll = await contract.isApprovedForAll(owner.address, user.address);
        expect(isApprovedForAll).to.equal(false);

        await contract.connect(owner).mint();

        let totalSupply = await contract.totalSupply(); // 也就是刚刚铸造的tokenId
        let tokenId = totalSupply;

        await contract.connect(owner).mint();

        await contract.connect(owner).setApprovalForAll(user.address, true);

        isApprovedForAll = await contract.isApprovedForAll(owner.address, user.address);
        expect(isApprovedForAll).to.equal(true);
    });

    it("transferFrom", async function () {
        let user = accounts[3];
        let receiver = accounts[4];

        await contract.connect(owner).mint();

        let totalSupply = await contract.totalSupply(); // 也就是刚刚铸造的tokenId
        let tokenId = totalSupply;

        // 未授权
        await expect(
            contract.connect(user).transferFrom(owner.address, receiver.address, tokenId)
        ).to.revertedWith('ERC721: transfer caller is not owner nor approved');

        await contract.connect(owner).approve(user.address, tokenId);
        await contract.connect(user).transferFrom(owner.address, receiver.address, tokenId);
        let tokenOwner = await contract.ownerOf(tokenId);
        expect(tokenOwner).to.equal(receiver.address);
    });

    it("tokenURI", async function () {
        await contract.connect(owner).mint();

        let totalSupply = await contract.totalSupply(); // 也就是刚刚铸造的tokenId
        let tokenId = totalSupply;
        let tokenURI = await contract.tokenURI(tokenId);
        expect(tokenURI).to.equal(baseURI + tokenId);
    });

});