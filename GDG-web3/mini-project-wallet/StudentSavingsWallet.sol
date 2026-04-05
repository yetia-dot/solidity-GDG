// decentralized student savings wallet
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract StudentSavingsWallet {

    // admin role
    address public owner;
    uint256 public constant MIN_DEPOSIT = 0.001 ether;

    // transaction object
    struct Transaction{
        string txType;
        uint256 txAmount;
        uint256 txTimeStamp;
    }

    // account object
    struct Account{
        uint256 balance;
        Transaction[] history;
    }

    // mapping address to users
    mapping(address => Account) public accounts;

    // events
    event FundsDeposited(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);

    constructor(){
        owner = msg.sender;
    }

    // deposit function
    function deposit() public payable {
        // min deposite
        require(msg.value >= MIN_DEPOSIT, "minimum deposite is 0.001 ETH");
        // check intent
        require(msg.value > 0, "Deposite amount must be greater than 0");

        // update balance
        accounts[msg.sender].balance += msg.value;

        // update transaction history
        accounts[msg.sender].history.push(Transaction("Deposite", msg.value, block.timestamp));
   
        // emit event
        emit FundsDeposited(msg.sender, msg.value);
    }


    // withdraw function
    function withdraw(uint256 _amount) public  {
        // check balance
        require(accounts[msg.sender].balance >= _amount, "Insufficient balance");

        // update balance
        accounts[msg.sender].balance -= _amount;

        // update transaction history
        accounts[msg.sender].history.push(Transaction("Withdraw", _amount, block.timestamp));

        // cast sender to payable
        payable(msg.sender).transfer(_amount);

        // emit event
        emit FundsWithdrawn(msg.sender, _amount);
    }

    // get balance
    function getMyBalance() public view returns(uint256){
        return accounts[msg.sender].balance;
    }

    // get history
    function getMyHistory() public view returns(Transaction[] memory){
        return accounts[msg.sender].history;
    }

    // check contract liquidty (owner only)
    function getTotalLiquidty() public view returns(uint256){
        require(msg.sender == owner, "Only owner can view total liquidity");
        return address(this).balance;
    }
}
