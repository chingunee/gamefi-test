import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ethers } from "ethers";
import { useParams, Link } from "react-router-dom";

import { getTournamentContract } from "../../contracts/TournamentContractHelper";

const GameDetails = () => {
  let { gameName } = useParams();

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    getPlayerData();
  }, []);

  async function getPlayerData() {
    setLoading(true);
    let addr = "0x4a5288D28b21D097496b23A09BB5e0aA106F623a";
    const { tournamentReadContract } = await getTournamentContract(addr);

    let id = await tournamentReadContract.addressToPlayerId(
      ethereum.selectedAddress
    );

    let data = await tournamentReadContract.players(id.toNumber() - 1);
    setPlayerData(data);
  }

  return (
    <div className="w-full bg-[#02121d] text-white font-body">
      <div
        style={{
          backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)`,
        }}
        className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white space-y-6"
      >
        <h1 className="text-5xl font-bold">Stick</h1>
        <p className="text-lg text-white/80">Home - Game Details</p>
      </div>
      <div className="container mx-auto px-20 py-28 space-y-20">
        <div className="w-full rounded bg-[#0a1f2f] p-10 flex space-x-20 items-stretch">
          <div className="w-3/5 flex flex-col space-y-8">
            <div className="flex items-start space-x-6">
              <img
                className="w-24 h-24 rounded border border-white/50"
                src="https://demo.thetork.com/html/torkgo/assets/images/igo/author/1.png"
              />
              <div className="flex flex-col space-y-3">
                <h3 className="text-2xl font-bold">
                  {" "}
                  {playerData && playerData.nickname}
                </h3>
                <p className="font-medium text-lg text-white/80">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Repellendus obcaecati quas ex, praesentium omnis cum, corrupti
                  repudiandae placeat sapiente sit exercitationem mollitia
                  veniam illum. Autem nobis aliquid provident illo ad.
                </p>
              </div>
            </div>
            <div className="w-full rounded bg-[#0a1f2f] p-10 flex space-x-20">
              <div className="flex items-center space-x-4">
                <button className="bg-[#28dbd1] text-[#0a1f2f] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold h-8 w-20 rounded -skew-x-6">
                  Scores
                </button>
                <p className="text-white font-semibold text-lg">
                  {" "}
                  {playerData && playerData.score.toNumber()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-[#28dbd1] text-[#0a1f2f] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold h-8 w-20 rounded -skew-x-6">
                  Life
                </button>
                <p className="text-white font-semibold text-lg">
                  {playerData && playerData.life.toString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-[#28dbd1] text-[#0a1f2f] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold h-8 w-20 rounded -skew-x-6">
                  Player Address
                </button>
                <p className="text-white font-semibold text-lg">
                  {playerData && playerData.p_address}
                </p>
              </div>
              <Link
                target="_blank"
                to={`/games/${gameName}/play`}
                className="flex justify-center items-center bg-[#28dbd1] text-[#0a1f2f] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold h-8 w-20 rounded -skew-x-6"
              >
                PLAY
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameDetails;
