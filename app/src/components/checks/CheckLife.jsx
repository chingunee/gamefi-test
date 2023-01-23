import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getTournamentContract } from "../../../contracts/TournamentContractHelper";
import { getTournamentFactoryContract } from "../../../contracts/TournamentFactoryContractHelper.jsx";
import { playerHasLife } from "../../slices/appSlice.jsx";

export default function CheckLife({ children }) {
  const dispatch = useDispatch();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfPlayerHasLife();
  }, []);

  async function checkIfPlayerHasLife() {
    const { tournamentFactoryReadContract } =
      await getTournamentFactoryContract();
    let allTournamentIds =
      await tournamentFactoryReadContract.getAllTournaments();

    setLoading(true);

    for (let id of allTournamentIds) {
      let tournamentAddress = null;
      try {
        tournamentAddress =
          await tournamentFactoryReadContract.tournamentIdToAddress(
            id.toNumber()
          );
      } catch (e) {
        console.log(e);
      }

      if (tournamentAddress != null) {
        const { tournamentReadContract } = await getTournamentContract(
          tournamentAddress
        );

        let id = await tournamentReadContract.addressToPlayerId(
          window.ethereum.selectedAddress
        );

        let player = await tournamentReadContract.players(id.toNumber() - 1);
        let p_life = player.life;

        if (p_life.toNumber() > 0) {
          dispatch(playerHasLife());
        }
      }
    }
    setLoading(false);
  }
  return <>{children}</>;
}
