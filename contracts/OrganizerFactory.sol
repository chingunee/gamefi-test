// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../contracts/interfaces/IOrganizerNFT.sol";
import "./OrganizerNFT.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract OrganizerFactory is AccessControl {
  mapping(address => uint) public addressToOrganizerId;
  mapping(address => bool) public organizerHasNft;
  mapping(uint => address) public idToOrganizerAddress;
  uint public organizerLength = 0;
  
  OrganizerNFT public nft;

  event organizerNFTMinted (
    address organizerAddress,
    uint organizerId
  );

  event organizerNFTBurned (
    address organizerAddress,
    uint organizerId
  );

  constructor() {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    nft = new OrganizerNFT(address(this));
  }

  function createOrganizer(
    string memory _username,
    string memory _email,
    string memory _phone_number
  ) external {
    require(organizerHasNft[msg.sender] == false, "Acount has already organizerNFT.");

    uint id = nft.organizerMint(
      msg.sender,
      _username,
      _email,
      _phone_number
    );

    addressToOrganizerId[msg.sender] = id;
    idToOrganizerAddress[id] = msg.sender;
    organizerHasNft[msg.sender] = true;

    organizerLength++;
    emit organizerNFTMinted(msg.sender, id);
  }

  function deleteOrganizer(uint id) external {
    require(idToOrganizerAddress[id] == msg.sender, "Not the owner of this NFT.");
    delete addressToOrganizerId[msg.sender];
    delete idToOrganizerAddress[id];
    delete organizerHasNft[msg.sender];
    nft.organizerBurn(id);
    organizerLength--;
    emit organizerNFTBurned(msg.sender, id);
  }
}