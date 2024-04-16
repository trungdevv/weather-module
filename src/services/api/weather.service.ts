import { api } from "@/lib/api";
import { ApiKey } from "@/lib/config";
import { GetWeatherProps } from "@/types/weather";

export const getLocation = async (city: string) => {
  const { data } = await api.get(
    `/geo/1.0/direct?q=${city}&limit=1&appid=${ApiKey}`
  );
  return data[0];
};

// Get current and forecast weather
export const getWeather = async (param: GetWeatherProps) => {
  const { lat, lon, units } = param;
  const { data } = await api.get(
    `/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly&appid=${ApiKey}`
  );
  return data;
};

export const getAirQuality = async (param: GetWeatherProps) => {
  const { lat, lon } = param;
  const { data } = await api.get(
    `/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${ApiKey}`
  );
  return data;
};



