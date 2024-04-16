/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyData from "@/components/icon/EmptyData";
import {
  airQualityValue,
  capitalizeFirstLetter,
  degToDirection,
  formatDateWithTime,
  formatDayInWeek,
  formatFullNameDay,
  windSpeedToKmPerHour,
} from "@/lib/helper";
import { useAirQuality, useWeather } from "@/services/queries/weather.query";
import { WeatherData } from "@/types/weather";
import React, { useState } from "react";
type props = {
  lat: number;
  lon: number;
  name: string;
  country: string;
};
const Widget = ({ lat, lon, name, country }: props) => {
  const [units, setUnits] = useState<string>("metric");
  const [activeDay, setActiveDay] = useState(0); // default active current day by index
  const { data } = useWeather({
    lat: lat,
    lon: lon,
    units: units,
  });

  const { data: dataAirQuality } = useAirQuality({
    lat: lat,
    lon: lon,
  });
  return (
    <div className="border border-[#9696964D] min-h-[300px] rounded shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      {data ? (
        <>
          <div className="p-5">
            <p className="font-bold text-xl">
              {name}, {country}
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
            <div className="flex items-center">
              <div className="w-1/2 flex items-center gap-1">
                <img
                  className="w-16 h-16"
                  src={
                    activeDay === 0
                      ? `https://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}@2x.png`
                      : `https://openweathermap.org/img/wn/${data?.daily[activeDay]?.weather[0]?.icon}@2x.png`
                  }
                  alt="Weather Icon"
                />
                <div className="flex gap-1">
                  <p className="text-[44px] font-bold leading-[52px]">
                    {activeDay === 0
                      ? `${data?.current?.temp}°`
                      : `${data?.daily[activeDay]?.temp?.max}°`}
                  </p>
                  <p className="text-sm leading-4 text-[#666666] mt-2">
                    <span
                      className={`cursor-pointer  ${
                        units === "imperial"
                          ? "underline font-bold text-[#000]"
                          : ""
                      } `}
                      onClick={() => setUnits("imperial")}
                    >
                      F
                    </span>{" "}
                    <span className="text-[#000] font-bold">/</span>{" "}
                    <span
                      className={`cursor-pointer ${
                        units === "metric"
                          ? "underline font-bold text-[#000]"
                          : ""
                      } `}
                      onClick={() => setUnits("metric")}
                    >
                      C
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-1/2">
                <p className="text-[#222222] text-sm leading-4">
                  Humidity:{" "}
                  {activeDay === 0
                    ? `${data?.current?.humidity}%`
                    : `${data?.daily[activeDay]?.humidity}%`}
                </p>
                <p className="text-[#222222] text-sm leading-4">
                  Wind:{" "}
                  {units === "metric"
                    ? ` ${windSpeedToKmPerHour(data?.current?.wind_speed)} KPH`
                    : `${data?.current?.wind_speed} MPH`}{" "}
                  {degToDirection(data?.current?.wind_deg)}
                </p>
                {activeDay === 0 ? (
                  <p className="text-[#222222] text-sm leading-4">
                    Air Quality:{" "}
                    {airQualityValue(dataAirQuality?.list[0]?.main?.aqi)}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-8 text-center">
            {data?.daily?.map((item: WeatherData, index: number) => {
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
        </>
      ) : (
        <div className="text-center">
          <EmptyData className="mx-auto mt-[30px]" />
          <p className="text-lg leading-6">
            We could not find weather information for the location above
          </p>
        </div>
      )}
    </div>
  );
};

export default Widget;
