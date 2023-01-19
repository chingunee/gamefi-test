import { Link } from "react-router-dom";
import { Line } from "rc-progress";
import { useState } from "react";
import { ethers } from "ethers";
import moment from "moment";
import { useDispatch } from "react-redux";
import { triggerSuccessAlert, triggerInfoAlert } from "../slices/alertSlice";

import { getTournamentContract } from "../../contracts/TournamentContractHelper";

const ProfileCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [disableLoaderBtn, setDisableLoaderBtn] = useState(false);
  const [state, setState] = useState([]);
  const { data, index } = props;
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);

  return (
    <div className="w-full rounded bg-[#0a1f2f] p-10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-semibold text-xl">Nickname</p>
          <span className="font-bold text-2xl text-[#28dbd1]">Chingun</span>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-xl">Total Score</p>
          <span className="font-bold text-2xl text-[#28dbd1]">1,000</span>
        </div>

        <div className="flex-1 flex flex-col items-end">
          <p className="font-semibold text-xl">Score</p>
          <span className="font-bold text-2xl text-[#28dbd1]">
            {oneTimeScore}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
