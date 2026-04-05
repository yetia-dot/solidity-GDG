# Mini-Project: Decentralized Student Savings Wallet

## 🎯 Overview
A secure Solidity smart contract that acts as a personal savings account on the blockchain. Users can deposit ETH, track their transaction history, and withdraw funds with real-time balance checks.

---

## 🚀 Deliverables

### 1. Smart Contract Data
* **Contract Address:** `0xFEde8AeE0Ae3b497B8ecB7075E82D5868Bf59F2F`
* **Network:** Ethereum Sepolia Testnet
* **Deployment Hash:** `0xda336e773424f9b627879b3186869a4fb0d9f73cdb2fc1735b79e22bb05469e1`
* **Successful Interaction (Deposit):** `0xd8f25f339ca9e4c3301ee59b38f9ca9acabb7b6bfa7e4e26208eb7c8e10ad52a`
### 2. Implemented Requirements
- [x] **Deposit Function:** Uses `payable` and `msg.value` to receive ETH.
- [x] **Withdraw Function:** Validates balance using `require` before transferring funds.
- [x] **Data Storage:** Uses a `mapping` for balances and a `struct` array for transaction history.
- [x] **Bonus - Security:** Implemented "Checks-Effects-Interactions" pattern.
- [x] **Bonus - Events:** Emits `FundsDeposited` and `FundsWithdrawn` logs.
- [x] **Bonus - Admin:** Included an `owner` role with a `getTotalLiquidity` view function.

![Image](https://github.com/user-attachments/assets/e9f2c849-18fd-4ff5-afbe-f31421e39de4)---

## 🛠 Testing Guide
1. **Min Deposit:** Ensure deposit value is ≥ 0.001 ETH (1,000,000 Gwei).
2. **Withdrawal:** Use the `withdraw` function by inputting the amount in **Wei** (e.g., `1000000000000000` for 0.001 ETH).
3. **Verification:** Use `getMyBalance` and `getMyHistory` to verify the state updates.
