pragma solidity 0.5.6;
import "@openzeppelin/upgrades/contracts/Initializable.sol";

/**
 * @title Dex Provenance Contract
 * @author Ilia Bukalov (ilyabukalov@gmail.com)
 *
 * @dev Implementation of the Provenance.
 * 
 */
contract Provenance is Initializable {

    struct AssetIDRegister {
        address owner;
        uint256 blockNumberUpdated;
    }

    mapping(bytes32 => AssetIDRegister) internal assetIdRegisters;
    bytes32[] internal assetRegisterIds;

    event AssetRegistered(
        bytes32 indexed _assetID,
        address indexed _owner,
        uint256 _blockNumberUpdated
    );

    function initialize()
        public
        initializer
    {
    }

    function registerDID(
        bytes32 _assetId
    )
        public
        returns (uint size)
    {
        require(
            assetIdRegisters[_assetId].owner == address(0x0) ||
            assetIdRegisters[_assetId].owner == msg.sender,
            'Asset ID must be registered by the asset owners.'
        );

        address assetOwner = assetIdRegisters[_assetId].owner;

        if (assetOwner == address(0)) {
            assetOwner = msg.sender;
            assetRegisterIds.push(_assetId);
        }

        assetIdRegisters[_assetId] = AssetIDRegister({
            owner: assetOwner,
            blockNumberUpdated: block.number
        });

        emit AssetRegistered(
            _assetId,
            assetIdRegisters[_assetId].owner,
            block.number
        );

        return assetRegisterIds.length;
    }

    function getBlockNumberUpdated(bytes32 _assetId)
        public
        view
        returns (uint256 blockNumberUpdated)
    {
        return assetIdRegisters[_assetId].blockNumberUpdated;
    }
}
