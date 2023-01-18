import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getOrganizerNftContract } from "../../../contracts/OrganizerNFTContractHelper.jsx";
import { userIsOrganizer } from "../../slices/appSlice.jsx";

export default function CheckOrganizer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfUserIsOrganizer();
  }, []);

  async function checkIfUserIsOrganizer() {
    try {
      const { organizerNftReadContract } = await getOrganizerNftContract();
      let balance = await organizerNftReadContract.balanceOf(
        window.ethereum.selectedAddress
      );

      if (balance.toNumber() > 0) {
        dispatch(userIsOrganizer());
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <>{children}</>;
}
