import { ethers } from "ethers";
import MockTokenAbi from "../abi/MockToken.json";
import { mockToken } from "../genAddresses.json";
import { getContractEssentials } from "./helpers";

async function getMockTokenContract() {
  let { provider, signer } = await getContractEssentials();
  let address = mockToken;

  const mockTokenReadContract = new ethers.Contract(
    address,
    MockTokenAbi,
    provider
  );

  let mockTokenWriteContract = mockTokenReadContract.connect(signer);

  return { mockTokenReadContract, mockTokenWriteContract };
}

export { getMockTokenContract };
