import { Link } from "react-router-dom";
import { Line } from "rc-progress";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import moment from "moment";
import { useDispatch } from "react-redux";
import { triggerSuccessAlert, triggerInfoAlert } from "../slices/alertSlice";
import { useSelector } from "react-redux";

import { getTournamentContract } from "../../contracts/TournamentContractHelper";
import { getMockTokenContract } from "../../contracts/MockTokenContractHelper";

const TournamentCard = (props) => {
  const app = useSelector((state) => state.app);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const [disableLoaderBtn, setDisableLoaderBtn] = useState(false);
  const [disableLoaderBtnA, setDisableLoaderBtnA] = useState(false);
  const [disableLoaderBtnB, setDisableLoaderBtnB] = useState(false);

  const { data, index } = props;
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const [nickname, setNickname] = useState(0);

  useEffect(() => {
    getPlayerData();
  }, []);

  async function getPlayerData() {
    setLoading(true);
    const { tournamentReadContract } = await getTournamentContract(
      data.tournamentAddress
    );
    let id = await tournamentReadContract.addressToPlayerId(
      ethereum.selectedAddress
    );
    let p_data = await tournamentReadContract.players(id.toNumber() - 1);
    setPlayerData(p_data);
  }

  async function increase() {
    setLoadingA(true);
    setDisableLoaderBtnA(true);
    const { mockTokenWriteContract } = await getMockTokenContract();
    let amountSC = ethers.utils.parseEther(score.toString(), "18");

    let tx = await mockTokenWriteContract.increaseAllowance(
      data.tournamentAddress,
      amountSC
    );
    await tx.wait();

    dispatch(
      triggerSuccessAlert({ content: "Successfully increased allowance" })
    );
    setLoadingA(false);
    setDisableLoaderBtnA(false);
  }

  async function participateTournament() {
    setLoadingB(true);
    setDisableLoaderBtnB(true);
    const { tournamentWriteContract } = await getTournamentContract(
      data.tournamentAddress
    );
    let amountBN = ethers.utils.parseEther(score.toString(), "18");
    let tx = await tournamentWriteContract.participate(nickname, amountBN);
    await tx.wait();
    dispatch(
      triggerSuccessAlert({ content: "Successfully joined tournament" })
    );
    setLoadingB(false);
    setDisableLoaderBtnB(false);
  }

  return (
    <div className="w-full h-full flex flex-col rounded">
      <img
        className="h-2/5 rounded-t object-cover"
        src={data.tournamentDetails?.profile ?? ""}
        alt="img"
      />
      <div
        key={index}
        className="relative px-6 border-t-2 border-[#28dbd1]/50 flex flex-col justify-center pt-5 space-y-3"
      >
        <div className="absolute h-20 w-10/12 -top-10 left-1/2 -translate-x-1/2 flex items-center">
          <div className="h-12 w-full bg-[#0a1f2f] border-b-2 border-[#28dbd1]/50 flex items-center">
            <p className="text-white font-semibold text-xl pl-6">
              {data.tournamentDetails?.name ?? ""}
            </p>
          </div>
        </div>
        <p className="text-white/80 font-medium">
          {data.tournamentDetails?.description ?? ""}
        </p>

        {!app.isPlayer && (
          <div className="space-y-2">
            <p className="font-medium text-white/80">Nickname</p>
            <input
              className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none"
              placeholder="Enter your nickname here"
              name="_nickname"
              type="text"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        )}

        {app.isPlayer && (
          <div className="pt-4 flex items-center justify-between font-body text-lg">
            <p className="text-white/80 font-medium">Nickname:</p>
            <p className="text-[#28dbd1] font-semibold">
              {playerData && playerData.nickname}
            </p>
          </div>
        )}

        {!app.isPlayer && (
          <div className="space-y-2">
            <p className="font-medium text-white/80">Amount</p>
            <input
              className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none"
              placeholder="1 Life = 100MNFT"
              name="amount"
              type="text"
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
        )}

        {app.isPlayer && (
          <div className="pt-4 flex items-center justify-between font-body text-lg">
            <p className="text-white/80 font-medium">Score:</p>
            <p className="text-[#28dbd1] font-semibold">
              {playerData && playerData.score.toNumber()}
            </p>
          </div>
        )}

        {!app.isPlayer && (
          <button
            disabled={disableLoaderBtnA ? true : false}
            onClick={() => increase()}
            className={`font-body bg-[#28dbd1] text-[#0a1f2f]
      h-11 w-32 font-semibold rounded-md -skew-x-6 
      hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 
      duration-300 border border-transparent hover:bg-[#0a1f2f] text-lg ${
        disableLoaderBtnA ? "bg-gray-500" : "bg-[#28dbd1]hover:text-[#28dbd1]"
      } `}
          >
            {loadingA ? (
              <svg
                className={`inline mr-2 w-4 h-4 ${
                  disableLoaderBtnA ? "fill-black" : "text-blue-400 fill-white"
                }  animate-spin `}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              ""
            )}
            <span>Approve</span>
          </button>
        )}

        {app.isPlayer && (
          <div className="pt-4 flex items-center justify-between font-body text-lg">
            <p className="text-white/80 font-medium">Life:</p>
            <p className="text-[#28dbd1] font-semibold">
              {playerData && playerData.life.toNumber()}
            </p>
          </div>
        )}

        {!app.isPlayer && (
          <button
            disabled={disableLoaderBtnB ? true : false}
            onClick={() => participateTournament()}
            className={`font-body bg-[#28dbd1] text-[#0a1f2f]
      h-11 w-32 font-semibold rounded-md -skew-x-6 
      hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 
      duration-300 border border-transparent hover:bg-[#0a1f2f] text-lg ${
        disableLoaderBtnB ? "bg-gray-500" : "bg-[#28dbd1]hover:text-[#28dbd1]"
      } `}
          >
            {loadingB ? (
              <svg
                className={`inline mr-2 w-4 h-4 ${
                  disableLoaderBtn ? "fill-black" : "text-blue-400 fill-white"
                }  animate-spin `}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              ""
            )}
            <span>Participate</span>
          </button>
        )}
        <div className="font-body text-lg">
          <p className="text-white/80 font-medium">Raised Amount</p>
          <div className="space-y-1">
            <div className="font-body text-white font-semibold text-xl flex space-x-1 items-center">
              <p className="text-[#28dbd1]">5000</p>
              <span className="">/</span>
              <p>15000 BUSD</p>
            </div>
            <Line
              className="rounded"
              percent={10}
              strokeLinecap="square"
              strokeWidth={4}
              trailWidth={4}
              strokeColor="#28dbd1"
              trailColor="#02121d"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
