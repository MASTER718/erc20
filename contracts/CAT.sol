
pragma solidity^0.8.0;         //声明编译版本
import "hardhat/console.sol";  //可以测试输出

import "@openzeppelin/contracts/utils/math/SafeMath.sol";






contract CAT {
   using SafeMath for uint256;
    string private _name="CATCOIN";                   //名字 
    string private _symbol="CT";                     //单位
    uint8 private _decimals=18;                      //进位
    uint256 private _totalSupply=900000*10**18;                   //总的提供
    mapping (address => uint256)private _balances;  //钱包
    mapping (address => mapping (address => uint256))private _allowances;  //授权相关
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor() {

     _balances[msg.sender] = _totalSupply;

    }


  //返回代币信息
    function name() public view returns (string memory){
        return _name;
    }
    function symbol() public view returns (string memory){
        return _symbol;
    }
    function decimals() public view returns (uint8 ){
        return _decimals;
    }
     function totalSupply() public view  returns (uint256) {
    return _totalSupply;
    }





 //功能函数

   function balanceOf (address account) public view  returns(uint256){
    return _balances[account];
  }

   //查询授权数量
   function allowance(address owner,address spender) public view  returns (uint256){
    return _allowances[owner][spender];
  }

   //转账
   function transfer(address recipient ,uint256 amout) public returns(bool){
 
    //修改
    console.log("Sender balance is %s tokens", _balances[msg.sender]);
    console.log("Trying to send %s tokens to %s", amout,recipient);

    _transfer(msg.sender,recipient,amout);

    //修改
    console.log("Sender balance is %s tokens", _balances[msg.sender]);
    return true;
  }

  function _transfer(address sender,address recipient,uint256 amount) internal {
    require(sender != address(0), "CAT:transfer from the zero address");
    require(recipient != address(0),"CAT:teansfer to the zero address");
    _balances[sender] = _balances[sender].sub(amount);
    _balances[recipient] = _balances[recipient].add(amount);
    emit Transfer(sender,recipient,amount);

  }

  /* -- //-------控制员转账
  -- function console_transfer(address account,uint256 amount) internal {
  --   require(account != address(0),"CAT:mint to the zero address");
  --   _totalSupply = _totalSupply.add(amount);
  --   _balances[account] = _balances[account].add(amount);
  --   emit Transfer(address(0),account,amount);
  -- }


  --   console_transfer(msg.sender,_totalSupply);
  */

}

  


