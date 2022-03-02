// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StoreNft {
    //存储nft数额
    mapping(address => uint256) public balanceNft;

    //存储判断tokenid的原来拥有者
    mapping(uint256 => address) public oldownerNft;

    //接口地址
    address nft;

    constructor(address nft_) {
        nft = nft_;
    }

    //功能函数
    //存入金库
    function deposit(uint256 tokenid) public {
        //console.log("deposit-start");
        //加入nftoldowner
        oldownerNft[tokenid] = msg.sender;
        ERC721(nft).transferFrom(msg.sender, address(this), tokenid);
        //console.log("deposit-end");
        balanceNft[msg.sender]++;
    }

    //从金库取出
    function withdraw(uint256 tokenid) public {
        require(
            oldownerNft[tokenid] == msg.sender,
            "You are not  the old owner"
        );
        ERC721(nft).transferFrom(address(this), msg.sender, tokenid);
        //表示取出，删除存的记录
        delete oldownerNft[tokenid];
        balanceNft[msg.sender] = balanceNft[msg.sender] - 1;
    }
}
