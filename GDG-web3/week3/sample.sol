pragma solidity ^0.8.17;

contract sample {
    uint256 public favouriteNumber;

    string[] public favmentees;

    function addmentees(string memory name)public{
        favmentees.push(name);
    }

    uint256[] public store; 
    function collection(uint256 number)public{
        store.push(number);
    }

    function recollection()public{
        store.pop();
    }
    constructor(){
    collection(1);
    collection(11);
    collection(111);
    recollection();
    }
    function print() public view returns (string[] memory){
        return favmentees;
    } 
    function retrieve() public view returns (uint256[] memory){
        return store;
    }

    function getmentees() public view returns(string[] memory){
        return favmentees;
    }

    struct Mentee{
        string name;
        string id;
        bool isPresent;
        uint256 age;
    }
    Mentee public mentee;

    function setM(string memory _name, string memory _id, bool _isPresent, uint256 _age) public {
        mentee = Mentee(_name, _id, _isPresent, _age);
    }
    function printStruct() public view returns (Mentee memory){
        return mentee;
    }

    Mentee[] public mentees;

    function addM(string memory _name, string memory _id, bool _isPresent, uint256 _age) public {
        mentees.push(Mentee(_name, _id, _isPresent, _age));
    }
    }

    



