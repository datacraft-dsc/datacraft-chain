pragma solidity ^0.5.0;
// Copyright BigchainDB GmbH and Ocean Protocol contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/upgrades/contracts/Initializable.sol';


/**
 * @title Ocean Protocol DirectPurchase Contract
 * @author Ilia Bukalov (ilyabukalov@gmail.com)
 *
 * @dev Implementation of the DirectPurchase.
 *      IERC20 token is OceanToken.
 */
contract DirectPurchase is Initializable {

    IERC20 token;

    event TokenSent(
	address indexed _from,
	address indexed _to,
	uint256 _amount,
        bytes32 _reference1,
	bytes32 indexed _reference2
    );

    /**
    * @dev DirectPurchase Initializer
    *      Runs only on initial contract creation.
    * @param _token refers to the OceanToken address
    */
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
