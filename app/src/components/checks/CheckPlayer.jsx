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
      let addr = "0x7662c24Bb19e539A99f198afDEcb71F6CFf39AA3";
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
