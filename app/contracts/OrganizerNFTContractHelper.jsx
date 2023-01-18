import { ethers } from "ethers";
import OrganizerNftAbi from "../abi/OrganizerNFT.json";
import { organizerNft } from "../genAddresses.json";
import { getContractEssentials } from "./helpers";

async function getOrganizerNftContract() {
  let { provider, signer } = await getContractEssentials();
  let address = organizerNft;

  const organizerNftReadContract = new ethers.Contract(
    address,
    OrganizerNftAbi,
    provider
  );

  let organizerNftWriteContract = organizerNftReadContract.connect(signer);

  return { organizerNftReadContract, organizerNftWriteContract };
}

export { getOrganizerNftContract };
