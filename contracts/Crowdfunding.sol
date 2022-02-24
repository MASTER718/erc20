// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;


contract Crowdfunding {
    // 创作者
    address public author;

    // 参与金额
    mapping(address => uint) public joined;

    // 众筹目标
    uint constant Target = 10 ether;

    // 众筹截止时间
    uint public endTime;

    // 记录当前众筹价格
    uint public price  = 0.02 ether ;

    // 作者提取资金之后，关闭众筹
    bool public closed = false;

    // 部署合约时调用，初始化作者以及众筹结束时间
    constructor() {
        author = msg.sender;
        endTime = block.timestamp + 1 days;
    }

    // 更新价格，这是一个内部函数
    function updatePrice() internal {
        // address myAddress = address(this);

        uint rise = (address(this)).balance * 0.002 ether;
        // uint rise = 0.002 ether;
        price = 0.02 ether + rise;
    }

    // 用户向合约转账时 触发的回调函数
    function receive2() external payable {
        require(block.timestamp < endTime && !closed  , "Crowdfunding is over");
        require(joined[msg.sender] == 0 , "You have participated in crowdfunding");

        require (msg.value >= price, "Bid too low");
        joined[msg.sender] = msg.value;

        updatePrice();
     }

    // 用户向合约转账时 触发的回调函数
    receive() external payable {
        require(block.timestamp < endTime && !closed  , "Crowdfunding is over");
        require(joined[msg.sender] == 0 , "You have participated in crowdfunding");

        require (msg.value >= price, "Bid too low");
        joined[msg.sender] = msg.value;


        updatePrice();
     }

    // 作者提取资金
    function withdrawFund() external {
        require(msg.sender == author, "You are not the author");
        require(address(this).balance >= Target, "Did not meet the crowdfunding goal");
        closed = true;
        payable(msg.sender).transfer(address(this).balance);
    }

    // 读者赎回资金
    function withdraw() external {
        require(block.timestamp > endTime, "It's not yet the end of crowdfunding");
        require(!closed, "Crowdfunding reaches the standard, and the crowdfunding funds have been withdrawn");
        require(Target > address(this).balance, "Crowdfunding meets the standard, you can't withdraw funds");

        payable(msg.sender).transfer(joined[msg.sender]);
    }

}

