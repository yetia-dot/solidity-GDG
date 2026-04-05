// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {EthioLink} from "../src/EthioLink.sol";

contract DeployEthioLink is Script {
    function run() external {
        // Retrieve private key from environment or use a default for testing
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // This is the USDC address on Base Sepolia (Testnet)
        // For local testing, you can change this to any address
        address usdcAddress = 0x036CbD53842c5426634e7929541eC2318f3dCF7e; 

        vm.startBroadcast(deployerPrivateKey);

        EthioLink ethioLink = new EthioLink(usdcAddress);

        console.log("EthioLink deployed to:", address(ethioLink));

        vm.stopBroadcast();
    }
}