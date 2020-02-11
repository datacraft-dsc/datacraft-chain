pragma solidity 0.5.6;
import "@openzeppelin/upgrades/contracts/Initializable.sol";

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
        bytes32 lastChecksum;
        address lastUpdatedBy;
        uint256 blockNumberUpdated;
        address[] providers;
    }

    struct DIDRegisterList {
        mapping(bytes32 => DIDRegister) didRegisters;
        bytes32[] didRegisterIds;
    }

    event DIDAttributeRegistered(
        bytes32 indexed _did,
        address indexed _owner,
        bytes32 indexed _checksum,
        string _value,
        address _lastUpdatedBy,
        uint256 _blockNumberUpdated
    );

    DIDRegisterList internal didRegisterList;

    function registerAttribute(
        bytes32 _did,
        bytes32 _checksum,
        string memory _value
    )
        public
        returns (uint size)
    {
        require(
            didRegisterList.didRegisters[_did].owner == address(0x0) ||
            didRegisterList.didRegisters[_did].owner == msg.sender,
            'Attributes must be registered by the DID owners.'
        );

        require(
            bytes(_value).length <= 2048,
            'Invalid value size'
        );

        address didOwner = didRegisterList.didRegisters[_did].owner;

        if (didOwner == address(0)) {
            didOwner = msg.sender;
            didRegisterList.didRegisterIds.push(_did);
        }

        didRegisterList.didRegisters[_did] = DIDRegister({
            owner: didOwner,
            lastChecksum: _checksum,
            lastUpdatedBy: msg.sender,
            blockNumberUpdated: block.number,
            providers: new address[](0)
        });

        emit DIDAttributeRegistered(
            _did,
            didRegisterList.didRegisters[_did].owner,
            _checksum,
            _value,
            msg.sender,
            block.number
        );

        return didRegisterList.didRegisterIds.length;
    }

    function getBlockNumberUpdated(bytes32 _did)
        public
        view
        returns (uint256 blockNumberUpdated)
    {
        return didRegisterList.didRegisters[_did].blockNumberUpdated;
    }
}
