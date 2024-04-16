/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/Input";
import ClearInput from "@/components/icon/ClearInput";
import useDebounce from "@/hooks/useDebounce";
import {
  capitalizeFirstLetter,
  windSpeedToKmPerHour,
  degToDirection,
  formatDateWithTime,
  airQualityValue,
  formatDayInWeek,
  formatFullNameDay,
} from "@/lib/helper";
import {
  useAirQuality,
  useLocation,
  useWeather,
} from "@/services/queries/weather.query";
import { useState } from "react";

export default function Wheather() {
  const [searchTerm, setSearchTerm] = useState<string>("Hanoi");
  const [units, setUnits] = useState<string>("metric");
  const [activeDay, setActiveDay] = useState(0); // default active current day by index
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  function handleClear() {
    setSearchTerm("");
  }
  const { data: dataLocation } = useLocation(debouncedSearchTerm);
  const { data } = useWeather({
    lat: dataLocation?.lat,
    lon: dataLocation?.lon,
    units: units,
  });
  const { data: dataAirQuality } = useAirQuality({
    lat: dataLocation?.lat,
    lon: dataLocation?.lon,
  });

  return (
    <>
      <div className="relative">
        <Input
          value={searchTerm}
          placeholder="Search city"
          name="Search term"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log(debouncedSearchTerm);
          }}
        />
        <ClearInput
          className="absolute right-5 top-[15px] cursor-pointer"
          onClick={handleClear}
        />
      </div>
      {data && (
        <div className="border border-[#9696964D]  rounded shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="p-5">
            <p className="font-bold text-xl">
              {dataLocation?.name}, {dataLocation?.country}
            </p>
            <p className="text-[#666666] text-sm">
              {activeDay === 0
                ? `${formatDateWithTime(
                    data?.current?.dt
                  )} • ${capitalizeFirstLetter(
                    data?.current?.weather[0]?.description
                  )}`
                : `${formatFullNameDay(
                    data?.daily[activeDay]?.dt
                  )} • ${capitalizeFirstLetter(
                    data?.daily[activeDay]?.weather[0]?.description
                  )}`}
            </p>
          </div>
          <div className="flex">
            <div className="w-1/2 flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}@2x.png`}
                alt="Weather Icon"
              />
              <div className="flex">
                <p className="text-[44px] font-bold leading-loose">
                  {activeDay === 0
                    ? `${data?.current?.temp}°`
                    : `${data?.daily[activeDay]?.temp?.max}°`}
                </p>
                <p>
                  <span
                    className={`cursor-pointer ${
                      units === "imperial" ? "underline font-bold" : ""
                    } `}
                    onClick={() => setUnits("imperial")}
                  >
                    F
                  </span>{" "}
                  <span className="text-[#000] font-bold">/</span>{" "}
                  <span
                    className={`cursor-pointer ${
                      units === "metric" ? "underline font-bold" : ""
                    } `}
                    onClick={() => setUnits("metric")}
                  >
                    C
                  </span>
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <p className="text-[#222222] text-sm">
                Humidity:{" "}
                {activeDay === 0
                  ? `${data?.current?.humidity}%`
                  : `${data?.daily[activeDay]?.humidity}%`}
              </p>
              <p className="text-[#222222] text-sm">
                Wind:{" "}
                {units === "metric"
                  ? ` ${windSpeedToKmPerHour(data?.current?.wind_speed)} KPH`
                  : `${data?.current?.wind_speed} MPH`}{" "}
                {degToDirection(data?.current?.wind_deg)}
              </p>
              {activeDay === 0 ? (
                <p className="text-[#222222] text-sm">
                  Air Quality:{" "}
                  {airQualityValue(dataAirQuality?.list[0]?.main?.aqi)}
                </p>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-8 text-center">
            {data?.daily?.map((item: any, index: number) => {
              const isActive = index === activeDay;
              return (
                <div
                  key={item?.dt}
                  className={`flex flex-col gap-[2px] py-[20px] border cursor-pointer ${
                    isActive
                      ? "[border-image:linear-gradient(179.91deg,rgba(34,34,34,1),rgba(255,255,255,0))_14.04] bg-[#F7F7F7]"
                      : ""
                  }`}
                  onClick={() => setActiveDay(index)}
                >
                  <p className="text-sm font-bold leading-[16px]">
                    {formatDayInWeek(item?.dt)}
                  </p>
                  <img
                    className="w-12 h-12 mx-auto"
                    src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
                    alt="Weather Icon"
                  />
                  <p className="text-lg font-bold leading-[21px]">
                    {item?.temp?.max}°
                  </p>
                  <p className="text-sm leading-[16px]">{item?.temp?.min}°</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
