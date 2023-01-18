import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  checkMetamask,
  checkConnected,
  connectMetamask,
} from "../../slices/metamaskSlice";
import Metamask from "../../../assets/metamask.png";

const CheckMetamask = ({ children }) => {
  const metamask = useSelector((state) => state.metamask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkMetamask());

    setTimeout(() => {
      dispatch(checkConnected());
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(connectMetamask());
  }, [metamask.isConnected]);

  if (!metamask.haveMetamask) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-full h-screen">
        <img src={Metamask} width={200} height={200} alt="Metamask Image" />
        <span className="text-xl font-bold text-center text-black md:text-3xl">
          No metamask your browser, <br></br> Please download have metamask
          browser
        </span>
      </div>
    );
  }

  if (!metamask.isConnected) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <img src={Metamask} width={200} height={200} alt="Metamask Image" />
        <span className="text-xl font-bold text-center text-black md:text-2xl mt-5">
          Please connect Metamask
        </span>
        <button
          className="text-md font-bold text-center text-white md:text-md py-2 px-5 mt-1 bg-blue-400 rounded-2xl"
          onClick={() => {
            dispatch(connectMetamask());
          }}
        >
          Connect Metamask
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default CheckMetamask;
