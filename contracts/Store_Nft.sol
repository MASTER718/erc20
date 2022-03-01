// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Store_Nft{
    //存储nft数额
    mapping(address => uint256) public blance_nft;
    //接口地址
    address  nft;    

    constructor(address nft_) {

     nft=nft_;


    }

    //功能函数
    //存入金库
   function deposit(uint256 amount) public {
    
    
 

    }


    //从金库取出
      function withdraw(uint256 amount) public {
        


        
     }


     //查询余额
     function showmoney(address addr) public view returns (uint256){

   

     }
    
}