// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Store_Nft{


    //存储nft数额
    mapping(address => uint256) public balance_nft;

    //存储判断tokenid的原来拥有者
    mapping(uint256 => address) public oldowner_nft;

    //接口地址
    address  nft;    

    constructor(address nft_) {

     nft=nft_;

    }

         //功能函数
         //存入金库
           function deposit(uint256 tokenid) public {
        
           console.log("deposit-start");
           //加入nftoldowner
           oldowner_nft[tokenid] = msg.sender;
           ERC721(nft).transferFrom(msg.sender,address(this),tokenid);
           console.log("deposit-end");
           balance_nft[msg.sender]= balance_nft[msg.sender] +1;


    }


      //从金库取出
      function withdraw(uint256 tokenid) public {

            require(oldowner_nft[tokenid]==msg.sender ,"You are not  the old owner");       
            ERC721(nft).transferFrom(address(this),msg.sender,tokenid);
            //表示取出，删除存的记录
            delete oldowner_nft[tokenid];
            balance_nft[msg.sender]= balance_nft[msg.sender]-1;
            
     }

    

     //查询余额
     function shownft(address addr) public view returns (uint256){

           return  balance_nft[addr];

     }

     function checkID(uint256 tokenid) public view  returns  (string memory){
          if(oldowner_nft[tokenid]==msg.sender){

                 return "Yes";
 


          }else return "No";
     
     }
    
}