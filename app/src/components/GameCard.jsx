import { useState } from "react";
import { ethers } from "ethers";
import moment from "moment";
import { useDispatch } from "react-redux";
import { triggerSuccessAlert } from "../slices/alertSlice";
import { getTournamentContract } from "../../contracts/TournamentContractHelper";

const GameCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [disableLoaderBtn, setDisableLoaderBtn] = useState(false);
  const [state, setState] = useState([]);
  const { data, index } = props;
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function participateTournament() {
    setLoading(true);
    setDisableLoaderBtn(true);
    const { tournamentWriteContract } = await getTournamentContract(
      data.tournamentAddress
    );
    let tx = await tournamentWriteContract.participate(
      state._nickname,
      ethers.utils.parseEther(score)
      //   value: ethers.utils.parseEther(ethers.utils.formatUnits(nftPriceBN, 18)),
      // }
    );
    await tx.wait();
    dispatch(triggerSuccessAlert({ content: "Success mint action" }));
    setLoading(false);
    setDisableLoaderBtn(false);
  }

  return (
    <div className="flex flex-col h-full border rounded-2xl p-5 justify-center">
      <div
        className="flex flex-col justify-center text-center h-full"
        key={index}
      >
        <div className="w-full flex justify-center break-all">
          <img
            src={data.tournamentDetails?.profile ?? ""}
            width={"100%"}
            alt="Event Image"
            className="flex justify-center text-center rounded-2xl"
          />
        </div>
        <div className="flex flex-col my-4">
          <span className="font-medium text-lg break-all">
            {data.tournamentDetails?.name ?? ""}
          </span>
          <span className="text-sm font-normal">
            {data.tournamentDetails?.description.length > 50
              ? data.tournamentDetails?.description.substring(0, 100) + "..."
              : "" ?? ""}
          </span>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-white/80">Nickname</p>
          <input
            className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none"
            placeholder="Enter name of tournament here"
            name="_nickname"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <p className="font-medium text-white/80">Amount</p>
          <input
            className="bg-[#02121d] rounded w-full h-12 px-3 focus:outline-none"
            placeholder="Enter name of tournament here"
            name="amount"
            type="text"
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        {/* <div className="flex flex-col gap-1 w-full">
          <a
            className="text-gray-700 font-medium text-center break-all"
            href={data.tournamentDetails.socialLink}
            target={"_blank"}
          >
            <span className="text-black">Social Link: </span>
            {data.tournamentDetails.socialLink}
          </a>
          <span>
            <span className="font-semibold break-all">Date: </span>{" "}
            {moment(data.tournamentDetails.date.toNumber() * 1000).format(
              "lll"
            )}
          </span>
        </div> */}
      </div>
      <div className="flex justify-center items-center mt-5">
        <button
          className={`flex justify-center items-center rounded-lg px-4 ${
            disableLoaderBtn ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } cursor-pointer h-10 font-semibold text-white`}
          disabled={disableLoaderBtn ? true : false}
          onClick={() => participateTournament()}
        >
          {loading ? (
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
      </div>
    </div>
  );
};

export default GameCard;
