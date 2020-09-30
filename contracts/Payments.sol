pragma solidity ^0.6.2;

// erc20 interface
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Payments {
    address public admin;
    IERC20 public dai;


// event for Payment bein gDone
    event PaymentDone(
        address payer,
        uint amount,
        uint paymentId,
        // dates are represented as integers in solidity
        uint date
    );

    constructor(address adminAddress, address daiAddress) public {
        admin = adminAddress;
        dai = IERC20(daiAddress);
    }

    function pay(uint amount, uint paymentId) external {
        // transferFrom has owner, recipient and amount
        dai.transferFrom(msg.sender, admin, amount);
        // emit event
        emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
    }
}