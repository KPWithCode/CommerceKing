pragma solidity ^0.6.2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// contract inheritance for Dai Mock

contract Dai is ERC20 {
    // triggers constructor of the smart contract it inherits from. 
    constructor() ERC20('Dai Stablecoin', 'DAI') public {}

    function faucet(address to, uint amount) external {
        _mint(to, amount);
    }
}