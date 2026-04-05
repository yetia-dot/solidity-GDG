// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EthioLink} from "../src/EthioLink.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// A simple Mock USDC so we have tokens to play with
contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(msg.sender, 1000 * 10**6); // Mint $1000 (USDC has 6 decimals)
    }
}

contract EthioLinkTest is Test {
    EthioLink public ethioLink;
    MockUSDC public usdc; // Fixed: lowercase for mutable variables
    address public creator = address(1);
    address public fan = address(2);

    function setUp() public {
        usdc = new MockUSDC();
        ethioLink = new EthioLink(address(usdc));

        // Fixed: Check return value to satisfy linter
        bool success = usdc.transfer(fan, 500 * 10**6);
        require(success, "Transfer failed");
    }

    function test_Registration() public {
        vm.prank(creator);
        ethioLink.register("yeti_codes", "ipfs://profile_pic_hash");

        (address wallet, string memory username, , , bool registered) = ethioLink.creators(creator);
        
        assertEq(wallet, creator);
        assertEq(username, "yeti_codes");
        assertTrue(registered);
    }

    function test_Tipping() public {
        // 1. Register a creator
        vm.prank(creator);
        ethioLink.register("yeti_codes", "ipfs://hash");

        // 2. Fan approves EthioLink to spend their USDC
        vm.startPrank(fan);
        usdc.approve(address(ethioLink), 100 * 10**6); // Approve $100

        // 3. Fan sends a $100 tip
        ethioLink.tip("yeti_codes", 100 * 10**6);
        vm.stopPrank();

        // 4. Check balances
        // Creator should have $99 (100 minus 1% fee)
        assertEq(usdc.balanceOf(creator), 99 * 10**6);
        
        // Treasury (this test contract) should have $500 (initial) + $1 (fee)
        assertEq(usdc.balanceOf(address(this)), 501 * 10**6); 
    }
}