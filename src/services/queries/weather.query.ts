import { useQuery } from "@tanstack/react-query";
import {
  getAirQuality,
  getLocation,
  getWeather,
} from "../api/weather.service";
import { GetWeatherProps } from "@/types/weather";

export const useLocation = (city: string) => {
  return useQuery({
    queryKey: ["location", city],
    queryFn: () => getLocation(city),
  });
};

export const useWeather = (param: GetWeatherProps) => {
  return useQuery({
    queryKey: ["weather", param],
    queryFn: () => getWeather(param),
    enabled: !!param.lat && !!param.lon,
  });
};
export const useAirQuality = (param: GetWeatherProps) => {
  return useQuery({
    queryKey: ["air-quality", param],
    queryFn: () => getAirQuality(param),
    enabled: !!param.lat && !!param.lon,
  });
};
