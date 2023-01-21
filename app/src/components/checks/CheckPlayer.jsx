import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getTournamentContract } from "../../../contracts/TournamentContractHelper";
import { userIsPlayer } from "../../slices/appSlice.jsx";

export default function CheckPlayer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfUserIsPlayer();
  }, []);

  async function checkIfUserIsPlayer() {
    try {
      let addr = "0x0E2FeD281E2b8A55Ede1b4fEe7cC6DFbE2E7A8a1";
      const { tournamentReadContract } = await getTournamentContract(addr);
      let balance = await tournamentReadContract.addressJoined(
        window.ethereum.selectedAddress
      );

      if (balance) {
        dispatch(userIsPlayer());
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <>{children}</>;
}
