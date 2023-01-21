import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getTournamentContract } from "../../../contracts/TournamentContractHelper";
import { playerHasLife } from "../../slices/appSlice.jsx";

export default function CheckLife({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfPlayerHasLife();
  }, []);

  async function checkIfPlayerHasLife() {
    try {
      let addr = "0x0E2FeD281E2b8A55Ede1b4fEe7cC6DFbE2E7A8a1";
      const { tournamentReadContract } = await getTournamentContract(addr);

      let id = await tournamentReadContract.addressToPlayerId(
        window.ethereum.selectedAddress
      );

      let player = await tournamentReadContract.players(id.toNumber() - 1);
      let p_life = player.life;

      if (p_life.toNumber() > 0) {
        dispatch(playerHasLife());
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <>{children}</>;
}
