import React from "react";

const Badge = ({ discount }) => {
  return (
    <>
      {Number(discount) !== 0 && (
        <div className="bg-primeColor w-[70px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-black duration-300 cursor-pointer">
          {discount} %
        </div>
      )}
    </>
  );
};

export default Badge;
