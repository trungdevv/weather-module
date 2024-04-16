/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/Input";
import ClearInput from "@/components/icon/ClearInput";
import useDebounce from "@/hooks/useDebounce";

import { useLocation } from "@/services/queries/weather.query";
import { useState } from "react";
import Widget from "./Widget";

export default function Weather() {
  const [searchTerm, setSearchTerm] = useState<string>("Hanoi");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  function handleClear() {
    setSearchTerm("");
  }
  const { data: dataLocation } = useLocation(debouncedSearchTerm);

  return (
    <>
      <div className="relative">
        <Input
          value={searchTerm}
          placeholder="Search city"
          name="Search term"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <ClearInput
          className="absolute right-5 top-[15px] cursor-pointer"
          onClick={handleClear}
        />
      </div>
          <Widget lat={dataLocation?.lat} lon={dataLocation?.lon} name={dataLocation?.name} country={dataLocation?.country}/>
      
    </>
  );
}
