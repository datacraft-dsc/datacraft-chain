pragma solidity ^0.5.0;
// SPDX-License-Identifier: (Apache-2.0 AND CC-BY-4.0)
// Code is Apache-2.0 and docs are CC-BY-4.0

import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Capped.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol';
// import '@openzeppelin/upgrades/contracts/Initializable.sol';

/**
 * @title Datacraft ERC20 Token Contract
 *
 * @dev Implementation of the Datacraft Token.
 *      Datacraft Token is ERC20 token
 */
contract DatacraftToken is Ownable, ERC20Detailed, ERC20Capped {

    using SafeMath for uint256;

    function initialize(
        address _owner,
        address _initialMinter
    )
        public
        initializer
    {
        uint256 CAP = 1410000000;
        uint256 TOTALSUPPLY = CAP.mul(10 ** 18);

        ERC20Detailed.initialize('Token', 'DATACRAFT', 18);
        ERC20Capped.initialize(TOTALSUPPLY, _owner);
        Ownable.initialize(_owner);
        _addMinter(_initialMinter);
    }
}
