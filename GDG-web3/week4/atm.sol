// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;


contract atm {
    mapping (address => uint256) public balances;
    address public owner;
    bool public paused = false;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"only owner can do this");
        _;
    }

    modifier whenNotPaused(){
        require(!paused,"ATM is Paused");
        _;
    }
    

    function deposit() public payable whenNotPaused {
        require(msg.value > 0, "Enter deposite amount: ");
        balances[msg.sender] += msg.value;
    }

   
    function withdraw(uint256 amount) public whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Not enough balance for withdrwal");

        balances[msg.sender] -= amount;
        
        payable(msg.sender).transfer(amount);
    }

   
    function getMyBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

   
    function pause() public onlyOwner {
        paused = true;
    }

    
    function unpause() public onlyOwner {
        paused = false;
    }

   

    
}