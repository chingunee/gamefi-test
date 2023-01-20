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
      let addr = "0x7662c24Bb19e539A99f198afDEcb71F6CFf39AA3";
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
