import { ethers } from "ethers";
import { getContractEssentials } from "./helpers";
import { organizerFactory } from "../genAddresses.json";
import organizerFactoryAbi from "../abi/OrganizerFactory.json";

async function getOrganizerFactoryContract() {
  let { provider, signer } = await getContractEssentials();

  const organizerReadContract = new ethers.Contract(
    organizerFactory,
    organizerFactoryAbi,
    provider
  );

  let organizerWriteContract = organizerReadContract.connect(signer);

  return { organizerReadContract, organizerWriteContract, provider, signer };
}

export { getOrganizerFactoryContract };
