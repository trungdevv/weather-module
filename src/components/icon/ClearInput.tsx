import React from "react";
type props = {
  onClick: () => void;
  className: string;
};
const ClearInput = ({ onClick, className }: props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path stroke="#000" d="m.354.646 13 13m-12.708 0 13-13" />
    </svg>
  );
};

export default ClearInput;
