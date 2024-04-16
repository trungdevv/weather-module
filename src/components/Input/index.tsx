/* eslint-disable @typescript-eslint/no-unused-vars */
import { type InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement>;
const Input = ({ ...rest }: Props) => {
  return (
    <input
      className="border border-[#9696964D] h-[44px] text-lg focus:border-[#222222] outline-none rounded-[4px] px-5 py-[10px] w-full mb-2"
      {...rest}
    />
  );
};

export default Input;
