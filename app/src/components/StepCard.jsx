import React from "react";

export default function StepCard({
  id,
  toggle,
  isHover,
  step,
  title,
  desc,
  img,
}) {
  return (
    <div
      onMouseEnter={() => toggle(id, true)}
      onMouseLeave={() => toggle(id, false)}
      className="w-full flex flex-col items-center text-white hover:text-[#28dbd1] space-y-3"
    >
      <img
        className={`${
          isHover.id === id && isHover.hover ? "scale-110" : "scale-100"
        } duration-500 w-24 h-24 object-contain`}
        src={img}
        alt="img"
      />
      <h2 className="md:text-2xl text-lg font-bold">
        {step}. {title}
      </h2>
      <p className="font-medium text-white/80 text-center text-sm md:text-base">
        {desc}
      </p>
    </div>
  );
}
