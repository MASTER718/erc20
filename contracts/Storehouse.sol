// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Storehouse {
    //store数额
    mapping(address => uint256) public money;
    address token;

    constructor(address token_) {
     token=token_;
    }


    //功能函数
    //存入金库
    function deposit(uint256 amount) public {

          uint256 m = IERC20(token).balanceOf(msg.sender);
          uint256 allowance = IERC20(token).allowance(msg.sender, address(this));
          console.log("----deposit-----", m, amount, allowance);

          // 判断资产 msg.sender
          // 判断授权
          require(m>=amount, "insufficient funds");
          require(allowance>=amount, "insufficient allowance ");

          IERC20(token).transferFrom(msg.sender, address(this),amount);
          money[msg.sender]+=amount;
 

    }

     //从金库取出
     function withdraw(uint256 amount) public {
         // 判断账本
         // 调用ierc（msg.seder,amount）方法发送
         // 账本减去

         require(money[msg.sender]>amount,' insufficient Balance');
         uint256  m = money[msg.sender] - amount;
          money[msg.sender] =m;
          IERC20(token).transfer(msg.sender,amount);
        
     }

     //查询余额
     function showmoney(address addr) public view returns (uint256){

        return money[addr];

     }

    
}