// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "../contracts/Tournament.sol";
import "../contracts/structs/TournamentDetails.sol";
import "../contracts/OrganizerFactory.sol";
import "./interfaces/IOrganizerNFT.sol";

contract TournamentFactory is AccessControl {
  mapping(address => uint[]) public addressToOrganizerTournamentIds;
  mapping(uint => address) public tournamentIdToAddress;

  uint[] public tournaments;
  uint public tournamentId;

  OrganizerFactory public organizerFactory;
  IOrganizerNFT public organizerNft;
  TournamentDetails public tournamentDetails;

  event TournamentCreated (
    uint indexed tournamentId,
    address indexed organizerAddress
  );

  modifier isOrganizer() {
    require(
        organizerNft.balanceOf(msg.sender) > 0,
        "Not Organizer.");
    _;
  }

  constructor(address _organizerNft) {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    organizerNft = IOrganizerNFT(_organizerNft);

    tournamentId = 1;
  }

  function createTournament(
    address _mockToken,
    address _tournamentOwner,
    uint _tournamentEndTime,
    TournamentDetails memory _tournamentDetails
  ) isOrganizer() external {
    require(
        organizerNft.balanceOf(msg.sender) > 0,
        "USER ISN'T ORGANIZER");

    Tournament _tournament = new Tournament(
      _mockToken,
      _tournamentOwner,
      _tournamentEndTime,
      _tournamentDetails
    );

    addressToOrganizerTournamentIds[msg.sender].push(tournamentId);
    tournamentIdToAddress[tournamentId] = address(_tournament);

    tournaments.push(tournamentId);
    emit TournamentCreated(tournamentId, msg.sender);
    tournamentId += 1;
  }

  function getOrganizerAllTournaments() external view returns(uint[] memory){
    return addressToOrganizerTournamentIds[msg.sender];
  }

  function getOrganizerTournament(address _organizer) external view returns(uint[] memory){
    return addressToOrganizerTournamentIds[_organizer];
  }

  function getTournamentAddress(uint _id) external view returns(address) {
    return tournamentIdToAddress[_id];
  }

  function getAllTournaments() external view returns(uint[] memory) {
    return tournaments;
  }

  function getTournamentLength() external view returns(uint) {
    return tournaments.length;
  }
}