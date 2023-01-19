import React from "react";

export default function OfferCard({ title, desc, img }) {
  return (
    <div className="w-full flex flex-col items-center text-white space-y-3">
      <img
        className="duration-500 w-24 h-24 object-contain"
        src={img}
        alt="img"
      />
      <h2 className="md:text-2xl text-lg font-bold">{title}</h2>
      <p className="font-medium text-white/80 text-center text-sm md:text-base">
        {desc}
      </p>
    </div>
  );
}
