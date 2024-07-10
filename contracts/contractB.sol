// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./contractA.sol";

contract AdminFacet is DiamondStorage {
   
    mapping(address => bool) public admins;
    address public  superAdmin;
    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed admin);
    event AdminRoleTransferred(address indexed oldAdmin, address indexed newAdmin);
    event AdminRoleRenounced(address indexed admin);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    constructor() {
        superAdmin = msg.sender;
       
    }

    modifier onlySuperAdmin() {
        require( msg.sender==superAdmin, "Caller is not super admin");
        _;
    }
     modifier onlyAdmin() {
        require(admins[msg.sender]==true, "Caller is not admin");
        _;
    }
    

   

    function addAdmin(address newAdmin) external onlySuperAdmin {
        admins[newAdmin] = true;
        emit AdminAdded(newAdmin);
    }

    function removeAdmin(address admin) external onlySuperAdmin {
        admins[admin] = false;
        emit AdminRemoved(admin);
    }

   function transferAdminRole(address newAdmin) external onlyAdmin {
    require(admins[newAdmin], "New admin must be present in admins mapping");

    admins[msg.sender] = false;
    admins[newAdmin] = true;
    
    emit AdminRoleTransferred(msg.sender, newAdmin);
}


    function renounceAdminRole() external onlyAdmin {
        admins[msg.sender] = false;
        emit AdminRoleRenounced(msg.sender);
    }

     function changeContractAAdmin(address newAdmin) external {
        Storage storage ds = diamondStorage();
        address oldAdmin = ds.admin;
        ds.admin = newAdmin;
        emit AdminChanged(oldAdmin, newAdmin);
    }
}
