import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function MemberCard({
  id,
  toggle,
  isHover,
  name,
  profession,
  img,
}) {
  return (
    <div
      onMouseEnter={() => toggle(id, true)}
      onMouseLeave={() => toggle(id, false)}
      className="w-full flex flex-col bg-[#0a1f2f] rounded"
    >
      <img
        className={`${
          isHover.id === id && isHover.hover ? "md:grayscale-0" : "md:grayscale"
        } object-contain duration-300 rounded-t`}
        src={img}
        alt="img"
      />
      <div className="flex flex-col items-center text-white w-1/2 mx-auto md:py-6 py-3 pb-6 font-body space-y-3">
        <h3
          className={`${
            isHover.id === id && isHover.hover ? "text-[#28dbd1]" : "text-white"
          } font-bold xl:text-2xl text-xl`}
        >
          {name}
        </h3>
        <p className="text-lg font-medium text-white/80">{profession}</p>
        <div className="flex items-center space-x-4">
          <div className="cursor-pointer flex items-center justify-center border border-[#28dbd1]/50 text-white/80 hover:text-[#28dbd1] w-8 h-8 rounded">
            <FaFacebookF size={18} />
          </div>
          <div className="cursor-pointer flex items-center justify-center border border-[#28dbd1]/50 text-white/80 hover:text-[#28dbd1] w-8 h-8 rounded">
            <FaLinkedinIn size={18} />
          </div>
          <div className="cursor-pointer flex items-center justify-center border border-[#28dbd1]/50 text-white/80 hover:text-[#28dbd1] w-8 h-8 rounded">
            <FaTwitter size={18} />
          </div>
          <div className="cursor-pointer flex items-center justify-center border border-[#28dbd1]/50 text-white/80 hover:text-[#28dbd1] w-8 h-8 rounded">
            <FaInstagram size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
