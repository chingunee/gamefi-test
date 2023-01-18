import { ethers } from "ethers";
import { getContractEssentials } from "./helpers";
import nftAbi from "../abi/ReferrableNft.json";

async function getNftContract(address) {
  let { provider, signer } = await getContractEssentials();

  const nftReadContract = new ethers.Contract(address, nftAbi, provider);

  let nftWriteContract = nftReadContract.connect(signer);

  return { nftReadContract, nftWriteContract };
}

export { getNftContract };
