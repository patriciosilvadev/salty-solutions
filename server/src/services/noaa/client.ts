import { NoaaStationEntity, noaaStations } from "./source";
import { TideData } from "./source-tide";
import { queryTimeSeriesData } from "../db";
import {
  TideDetail,
  WindDetail,
  TemperatureDetail,
} from "../../generated/graphql";
import { subHours } from "date-fns";
import { orderBy } from "lodash";

export const getStationById = (id: string): NoaaStationEntity | undefined => {
  return noaaStations.find((tideStation) => tideStation.id === id);
};

export async function getTidePredictions(
  stationId: string,
  start: Date,
  end: Date
): Promise<TideDetail[]> {
  const pk = `noaa-predictions-${stationId}`;
  const data = await queryTimeSeriesData<TideData>(pk, start, end);
  return data.map((datum) => ({ ...datum, time: datum.timestamp }));
}

export const getWind = async (
  stationId: string,
  start: Date,
  end: Date
): Promise<WindDetail[]> => {
  const pk = `noaa-wind-${stationId}`;
  return queryTimeSeriesData<WindDetail>(pk, start, end);
};

export const getWindLatest = async (stationId: string) => {
  const data = await getWind(stationId, subHours(new Date(), 24), new Date());

  if (data.length < 1) return null;

  return orderBy(data, [(x) => x.timestamp], ["desc"])[0];
};

export const getTemperature = async (
  stationId: string,
  start: Date,
  end: Date
): Promise<TemperatureDetail[]> => {
  const pk = `noaa-air_temperature-${stationId}`;
  return queryTimeSeriesData<TemperatureDetail>(pk, start, end);
};

export const getTemperatureLatest = async (stationId: string) => {
  const data = await getTemperature(
    stationId,
    subHours(new Date(), 24),
    new Date()
  );

  if (data.length < 1) return null;

  return orderBy(data, [(x) => x.timestamp], ["desc"])[0];
};

export const getWaterTemperature = async (
  stationId: string,
  start: Date,
  end: Date
): Promise<TemperatureDetail[]> => {
  const pk = `noaa-water_temperature-${stationId}`;
  return queryTimeSeriesData<TemperatureDetail>(pk, start, end);
};

export const getWaterTemperatureLatest = async (stationId: string) => {
  const data = await getWaterTemperature(
    stationId,
    subHours(new Date(), 24),
    new Date()
  );

  if (data.length < 1) return null;

  return orderBy(data, [(x) => x.timestamp], ["desc"])[0];
};
