import dayjs from "dayjs";

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const formatDateWithTime = (unixTimestamp: number) => {
  const dateObject = dayjs.unix(unixTimestamp);
  return `${dateObject.format("dddd")} ${dateObject.format("h:mmA")}`;
};
export const formatFullNameDay = (unixTimestamp: number) => {
  return dayjs.unix(unixTimestamp).format('dddd');
};
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const formatDayInWeek = (unixTimestamp: number) => {
  return dayjs.unix(unixTimestamp).format('ddd');
}
export const degToDirection = (deg: number): string => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index =
    Math.round(deg / (360.0 / directions.length)) % directions.length;
  return directions[index];
};
//metre per second to kilometer per hour
export const windSpeedToKmPerHour = (windSpeedMetersPerSecond: number) => {
  const conversionFactor = 3.6;
  const windSpeedKmPerHour = windSpeedMetersPerSecond * conversionFactor;
  return windSpeedKmPerHour.toFixed(2);
};
// Map index data api to value
export const airQualityValue = (index: number) => {
  const airQualityValues = [
    "",
    "Good",
    "Fair",
    "Moderate",
    "Poor",
    "Very Poor",
  ];
  return airQualityValues[index];
};