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

    mapping(bytes32 => uint256) internal assetIdRegisters;

    event AssetRegistered(
        bytes32 indexed _assetID,
        address indexed _user,
        uint256 _timestamp
    );

    function initialize()
        public
        initializer
    {
    }

    function registerAsset(
        bytes32 _assetId
    )
        public
    {
        if(assetIdRegisters[_assetId] == 0) 
	    assetIdRegisters[_assetId] = block.number;

        emit AssetRegistered(
            _assetId,
            msg.sender,
            now
        );
    }

    function getBlockNumber(bytes32 _assetId)
        public
        view
        returns (uint256)
    {
        return assetIdRegisters[_assetId];
    }
}
