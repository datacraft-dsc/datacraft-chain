pragma solidity 0.5.6;

import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/upgrades/contracts/Initializable.sol";


contract DirectPurchase is Initializable {

IERC20 token;

    event TokenSent(
	address indexed _from,
	address indexed _to,
	uint256 _amount,
        bytes32 _reference1,
	bytes32 indexed _reference2
    );

    function initialize(IERC20 _token
    )
        public
        initializer
    {
	token = _token;
    }

    function sendTokenAndLog(address to, uint256 amount, bytes32 reference1, bytes32 reference2) public {
	token.transferFrom(msg.sender, to, amount);
        emit TokenSent(msg.sender, to, amount, reference1, reference2);
    }
}
