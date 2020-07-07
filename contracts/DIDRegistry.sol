pragma solidity ^0.5.0;
import '@openzeppelin/upgrades/contracts/Initializable.sol';

/**
 * @title Dex DIDRegistry Contract
 * @author Ilia Bukalov (ilyabukalov@gmail.com)
 *
 * @dev Implementation of the DIDRegistry.
 *
 */
contract DIDRegistry is Initializable {

    struct DIDRegister {
        address owner;
        uint256 blockNumberUpdated;
    }

    mapping(bytes32 => DIDRegister) internal didRegisters;
    bytes32[] internal didRegisterIds;

    event DIDRegistered(
        bytes32 indexed _did,
        address indexed _owner,
        string _value,
        uint256 _blockNumberUpdated,
        uint _timestamp
    );

    function initialize()
        public
        initializer
    {
    }

    function registerDID(
        bytes32 _did,
        string memory _value
    )
        public
        returns (uint size)
    {
        require(
            didRegisters[_did].owner == address(0x0) ||
            didRegisters[_did].owner == msg.sender,
            'Attributes must be registered by the DID owners.'
        );

        require(
            bytes(_value).length <= 2048,
            'Invalid value size'
        );

        address didOwner = didRegisters[_did].owner;

        if (didOwner == address(0)) {
            didOwner = msg.sender;
            didRegisterIds.push(_did);
        }

        didRegisters[_did] = DIDRegister({
            owner: didOwner,
            blockNumberUpdated: block.number
        });

        emit DIDRegistered(
            _did,
            didRegisters[_did].owner,
            _value,
            block.number,
	    now
        );

        return didRegisterIds.length;
    }

    function getBlockNumberUpdated(bytes32 _did)
        public
        view
        returns (uint256 blockNumberUpdated)
    {
        return didRegisters[_did].blockNumberUpdated;
    }
}
