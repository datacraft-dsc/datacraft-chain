pragma solidity 0.5.6;
// Copyright BigchainDB GmbH and Ocean Protocol contributors
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Capped.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol';
import "@openzeppelin/upgrades/contracts/Initializable.sol";

/**
 * @title Ocean Protocol ERC20 Token Contract
 * @author Ocean Protocol Team
 *
 * @dev Implementation of the Ocean Token.
 *      Ocean Token is ERC20 token
 */
contract Token is Initializable, Ownable, ERC20Detailed, ERC20Capped {

    using SafeMath for uint256;

    function initialize(
    )
        public
        initializer
    {
        uint256 CAP = 1410000000;
        uint256 TOTALSUPPLY = CAP.mul(10 ** 18);

        ERC20Detailed.initialize('Token', 'OCEAN', 18);
        ERC20Capped.initialize(TOTALSUPPLY, msg.sender);
	Ownable.initialize(msg.sender);
    }
}
