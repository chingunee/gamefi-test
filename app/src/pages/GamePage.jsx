import React from "react";

import game1 from "../../assets/game1.png";
import img1 from "../../assets/img1.jpg";
import littleImg1 from "../../assets/littleImg1.png";
import titleImg2 from "../../assets/titleImg2.png";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";

export default function GamePage() {
  return (
    <div className="w-full bg-[#02121d] text-white font-body">
      <div
        style={{
          backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)`,
        }}
        className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white space-y-6"
      >
        <h1 className="text-5xl font-bold">Available Games</h1>
      </div>
      <div className="xl:container mx-auto xl:px-20 md:px-12 px-4 py-28 flex flex-wrap justify-between space-y-6 sm:space-y-0">
        <div className="w-full sm:w-[48%] lg:w-[30%] h-[35rem] bg-[#0a1f2f]">
          <GameCard
            slug={"stick-hero"}
            bgImage={game1}
            titleImage={littleImg1}
            gameName="Stick Hero"
            txt1="Public"
            txt2="42"
            txt3="TBA"
          />
        </div>
        <div className="w-full sm:w-[48%] lg:w-[30%] h-[35rem] bg-[#0a1f2f]">
          <GameCard
            slug={"football"}
            bgImage={img1}
            titleImage={titleImg2}
            gameName="Football"
            txt1="Public"
            txt2="42"
            txt3="TBA"
          />
        </div>
        <div className="w-full sm:w-[48%] lg:w-[30%]"></div>
      </div>
      <Footer />
    </div>
  );
}
