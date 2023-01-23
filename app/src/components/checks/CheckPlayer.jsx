import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getTournamentContract } from "../../../contracts/TournamentContractHelper";
import { getTournamentFactoryContract } from "../../../contracts/TournamentFactoryContractHelper.jsx";
import { userIsPlayer } from "../../slices/appSlice.jsx";

export default function CheckPlayer({ children }) {
  const dispatch = useDispatch();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfUserIsPlayer();
  }, []);

  async function checkIfUserIsPlayer() {
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

        let balance = await tournamentReadContract.addressJoined(
          window.ethereum.selectedAddress
        );

        if (balance) {
          dispatch(userIsPlayer());
        }
      }
    }
    setLoading(false);
  }
  console.log("tournaments: ", tournaments);

  return <>{children}</>;
}
