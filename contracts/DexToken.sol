pragma solidity ^0.5.0;
// Copyright BigchainDB GmbH and Ocean Protocol contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

// The original file is from here: https://github.com/oceanprotocol/keeper-contracts/blob/develop/contracts/OceanToken.sol
// This is has now been changed for Dex

import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Capped.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol';
import '@openzeppelin/upgrades/contracts/Initializable.sol';

/**
 * @title Dex ERC20 Token Contract
 * @author Ocean Protocol Team, Dex
 *
 * @dev Implementation of the Dex Token.
 *      Dex Token is ERC20 token
 */
contract DexToken is Initializable, Ownable, ERC20Detailed, ERC20Capped {

    using SafeMath for uint256;

    function initialize(
        address _initialMinter
    )
        public
        initializer
    {
        uint256 CAP = 1410000000;
        uint256 TOTALSUPPLY = CAP.mul(10 ** 18);

        ERC20Detailed.initialize('Token', 'DEX', 18);
        ERC20Capped.initialize(TOTALSUPPLY, msg.sender);
        Ownable.initialize(msg.sender);
        _addMinter(_initialMinter);
    }
}
