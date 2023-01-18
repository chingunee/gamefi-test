const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  const OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
  const organizerFactoryContract = await OrganizerFactory.deploy();
  await organizerFactoryContract.deployed();

  let organizerNftAddress = await organizerFactoryContract.nft();

  const tournamentFactory = await ethers.getContractFactory(
    "TournamentFactory"
  );
  const tournamentFactoryContract = await tournamentFactory.deploy(
    organizerNftAddress
  );
  await tournamentFactoryContract.deployed();

  console.log("organizerNftContract deployed to:", organizerNftAddress);
  console.log(
    "organizerFactoryContract deployed to:",
    organizerFactoryContract.address
  );
  console.log(
    "tournamentFactoryContract deployed to:",
    tournamentFactoryContract.address
  );

  const content = {
    organizerFactory: organizerFactoryContract.address,
    organizerNft: organizerNftAddress,
    tournamentFactory: tournamentFactoryContract.address,
  };
  createAddressJson(
    path.join(__dirname, "/../app/genAddresses.json"),
    JSON.stringify(content)
  );
}

function createAddressJson(path, content) {
  try {
    fs.writeFileSync(path, content);
    console.log("Created Contract Address JSON");
  } catch (err) {
    console.error(err);
    return;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
