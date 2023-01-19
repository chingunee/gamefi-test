import React from "react";
import { Link } from "react-router-dom";
import { Line } from "rc-progress";

export default function GameCard({
  slug,
  bgImage,
  titleImage,
  gameName,
  txt1,
  txt2,
  txt3,
}) {
  return (
    <div className="w-full h-full flex flex-col rounded">
      <img className="h-2/5 rounded-t object-cover" src={bgImage} alt="img" />
      <div className="relative px-6 border-t-2 border-[#28dbd1]/50 flex flex-col justify-center h-3/5 space-y-3">
        <div className="absolute h-20 w-10/12 -top-10 left-1/2 -translate-x-1/2 flex items-center">
          <img
            className="w-20 h-20 border-2 border-[#28dbd1]/50 rounded"
            src={titleImage}
            alt="img"
          />
          <div className="h-12 w-full bg-[#0a1f2f] border-b-2 border-[#28dbd1]/50 flex items-center">
            <p className="text-white font-semibold text-xl pl-6">{gameName}</p>
          </div>
          <div className="h-12 flex items-end">
            <div className="w-[2px] h-1/2 bg-[#28dbd1]/50"></div>
          </div>
        </div>
        <div className="pt-4 flex items-center justify-between font-body text-lg">
          <p className="text-white/80 font-medium">Round Name:</p>
          <p className="text-[#28dbd1] font-semibold">{txt1}</p>
        </div>
        <div className="flex items-center justify-between font-body text-lg">
          <p className="text-white/80 font-medium">Participent</p>
          <p className="text-[#28dbd1] font-semibold">{txt2}</p>
        </div>
        <div className="flex items-center justify-between font-body text-lg">
          <p className="text-white/80 font-medium">Project Start</p>
          <p className="text-[#28dbd1] font-semibold">{txt3}</p>
        </div>
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
        <Link to={`/games/${slug}`} className="pt-4">
          <button className="font-body bg-[#28dbd1] text-[#0a1f2f] h-11 w-32 font-semibold rounded-md -skew-x-6 hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] text-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
