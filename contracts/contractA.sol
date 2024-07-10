// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@solidstate/contracts/proxy/diamond/SolidStateDiamond.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DiamondStorage {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage");

    struct Storage {
        uint256 value;
        address admin;
    }

    function diamondStorage() internal pure returns (Storage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }
}

contract ContractA is SolidStateDiamond, DiamondStorage, ReentrancyGuard {
    event ValueUpdated(address indexed user, uint256 newValue);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == diamondStorage().admin, "Caller is not admin");
        _;
    }

    function initialize() external {
        Storage storage ds = diamondStorage();
        require(ds.admin == address(0), "Already initialized");
        ds.admin = msg.sender;
    }

    function setValue(uint256 newValue) external onlyAdmin nonReentrant {
        Storage storage ds = diamondStorage();
        ds.value += newValue;
        emit ValueUpdated(msg.sender, newValue);
    }

    function getValue() external view returns (uint256) {
        return diamondStorage().value;
    }

    function getAdmin() external view returns (address) {
        return diamondStorage().admin;
    }
}



