pragma solidity 0.5.6;

import 'token.sol';

contract DirectPurchase {

OceanToken token;

    event Log(
	address _from,
	address _to,
	uint256 _amount,
        bytes32 _reference1,
	bytes32 _reference2
    );

    constructor(OceanToken _token) public
    {
	token = _token;
    }

    function sendTokenAndLog(address to, uint256 amount, bytes32 reference1, bytes32 reference2) public {
	token.transferFrom(msg.sender, to, amount);
        emit Log(msg.sender, to, amount, reference1, reference2);
    }
}
