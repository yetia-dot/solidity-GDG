// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EthioLink is Ownable, ReentrancyGuard {
    struct Creator {
        address wallet;
        string username;
        string bioHash; // IPFS hash for bio/links
        uint256 totalTips;
        bool isRegistered;
    }

    // Using SCREAMING_SNAKE_CASE for the immutable variable
    IERC20 public immutable USDC;
    address public treasury;
    uint256 public protocolFee = 100; // 100 = 1% (basis points)

    mapping(address => Creator) public creators;
    mapping(string => address) public usernameToAddress;

    event CreatorRegistered(address indexed wallet, string username);
    event Tipped(address indexed from, address indexed to, uint256 amount);

    error UsernameTaken();
    error NotRegistered();
    error AlreadyRegistered();
    error TransferFailed();

    constructor(address _usdc) Ownable(msg.sender) {
        USDC = IERC20(_usdc);
        treasury = msg.sender;
    }

    // --- Identity Functions ---

    function register(string memory _username, string memory _bioHash) external {
        if (creators[msg.sender].isRegistered) revert AlreadyRegistered();
        if (usernameToAddress[_username] != address(0)) revert UsernameTaken();
        
        creators[msg.sender] = Creator({
            wallet: msg.sender,
            username: _username,
            bioHash: _bioHash,
            totalTips: 0,
            isRegistered: true
        });
        
        usernameToAddress[_username] = msg.sender;
        emit CreatorRegistered(msg.sender, _username);
    }

    // --- Tipping Functions ---

    function tip(string memory _username, uint256 _amount) external nonReentrant {
        address recipient = usernameToAddress[_username];
        if (recipient == address(0)) revert NotRegistered();
        
        uint256 fee = (_amount * protocolFee) / 10000;
        uint256 creatorAmount = _amount - fee;

        // 1. Pull USDC from the fan (requires prior approval)
        // Fixed: changed 'usdc' to 'USDC' to match the variable declaration
        if (!USDC.transferFrom(msg.sender, address(this), _amount)) revert TransferFailed();
        
        // 2. Pay Creator
        if (!USDC.transfer(recipient, creatorAmount)) revert TransferFailed();
        
        // 3. Pay Treasury
        if (!USDC.transfer(treasury, fee)) revert TransferFailed();

        creators[recipient].totalTips += creatorAmount;
        emit Tipped(msg.sender, recipient, _amount);
    }

    // --- Admin Functions ---

    function updateTreasury(address _newTreasury) external onlyOwner {
        treasury = _newTreasury;
    }
    // --- Admin & Safety Functions ---

    /**
     * @notice Allows the owner to withdraw collected protocol fees.
     * @param _amount The amount of USDC to withdraw.
     */
    function withdrawFees(uint256 _amount) external onlyOwner {
        if (!USDC.transfer(owner(), _amount)) revert TransferFailed();
    }

    /**
     * @notice Check a creator's total tips received.
     */
    function getCreatorStats(string memory _username) external view returns (uint256) {
        address creatorAddr = usernameToAddress[_username];
        if (creatorAddr == address(0)) revert NotRegistered();
        return creators[creatorAddr].totalTips;
    }
}