import axios from "axios";
import axiosRetry from "axios-retry";
import {
  addDays,
  addMinutes,
  differenceInMinutes,
  isAfter,
  isBefore,
  subDays,
  format,
} from "date-fns";
import { formatToTimeZone } from "date-fns-timezone";
import querystring from "querystring";
import { getCacheVal, setCacheVal } from "./db";

axiosRetry(axios, { retries: 3, retryDelay: (retryCount) => retryCount * 500 });

export interface TideStationEntity {
  id: string;
  name: string;
  coords: {
    lat: number;
    lon: number;
  };
}

const tideStations: TideStationEntity[] = [
  {
    id: "8765551",
    name: "Southwest Pass, Vermilion Bay",
    coords: { lat: 29.58, lon: -92.035 },
  },
  {
    id: "8765148",
    name: "Weeks Bay, LA",
    coords: { lat: 29.837, lon: -91.837 },
  },
  {
    id: "8768094",
    name: "Calcasieu Pass",
    coords: { lat: 29.7683, lon: -93.3433 },
  },
  {
    id: "8767961",
    name: "Bulk Terminal near Prien Lake",
    coords: { lat: 30.19, lon: -93.3 },
  },
  {
    id: "8767816",
    name: "Lake Charles",
    coords: { lat: 30.223333, lon: -93.221667 },
  },
  {
    id: "8765251",
    name: "Cypremort Point",
    coords: { lat: 29.7133, lon: -91.88 },
  },
  {
    id: "8764931",
    name: "Cote Blanche Island",
    coords: { lat: 29.735, lon: -91.7133 },
  },
  {
    id: "8763206",
    name: "Caillou Boca",
    coords: { lat: 29.0633333, lon: -90.8066667 },
  },
  {
    id: "8763506",
    name: "Raccoon Point, Isle Dernieres",
    coords: { lat: 29.0633333, lon: -90.9616667 },
  },
  {
    id: "8762888",
    name: "E. Isle Dernieres, Lake Pelto",
    coords: { lat: 29.0716667, lon: -90.64 },
  },
  {
    id: "8762928",
    name: "Cocodrie, Terrebonne Bay",
    coords: { lat: 29.245, lon: -90.6616667 },
  },
  {
    id: "8762850",
    name: "Wine Island, Terrebonne Bay",
    coords: { lat: 29.0783333, lon: -90.5866667 },
  },
  {
    id: "8762481",
    name: "Pelican Islands, Timbalier Bay",
    coords: { lat: 29.1283333, lon: -90.4233333 },
  },
  {
    id: "8765568",
    name: "Lighthouse Point",
    coords: { lat: 29.5233333, lon: -92.0433333 },
  },
  {
    id: "8764931",
    name: "Cote Blanche Island, West Cote Blanche Bay",
    coords: { lat: 29.735, lon: -91.7133333 },
  },
  {
    id: "8765026",
    name: "Marsh Island, Atchafalaya Bay",
    coords: { lat: 29.485, lon: -91.7633333 },
  },
  {
    id: "8761819",
    name: "Texaco Dock, Hackberry",
    coords: { lat: 29.4016667, lon: -90.0383333 },
  },
  {
    id: "8762675",
    name: "Timbalier Island, Timbalier Bay",
    coords: { lat: 29.0866667, lon: -90.5266667 },
  },
  {
    id: "8761305",
    name: "Shell Beach",
    coords: { lat: 29.8683333, lon: -89.6733333 },
  },
  {
    id: "8761529",
    name: "Martello Castle, Lake Borgne",
    coords: { lat: 29.945, lon: -89.835 },
  },
  {
    id: "8760742",
    name: "Comfort Island",
    coords: { lat: 29.8233333, lon: -89.27 },
  },
  {
    id: "8761108",
    name: "Bay Gardene",
    coords: { lat: 29.5983333, lon: -89.6183333 },
  },
  {
    id: "8760595",
    name: "Breton Island",
    coords: { lat: 29.4933333, lon: -89.1733333 },
  },
  {
    id: "8761724",
    name: "Grand Isle",
    coords: { lat: 29.2633333, lon: -89.9566667 },
  },
  { id: "8761826", name: "Caminada Pass", coords: { lat: 29.21, lon: -90.04 } },
  {
    id: "8761687",
    name: "Barataria Pass",
    coords: { lat: 29.275, lon: -89.945 },
  },
  {
    id: "8761677",
    name: "Independence Island",
    coords: { lat: 29.31, lon: -89.9383333 },
  },
  {
    id: "8761742",
    name: "Mendicant Island, Barataria Bay",
    coords: { lat: 29.3183333, lon: -89.98 },
  },
  {
    id: "8762075",
    name: "Port Fourchon, Belle Pass",
    coords: { lat: 29.1133333, lon: -90.1983333 },
  },
  {
    id: "8760721",
    name: "Pilottown",
    coords: { lat: 29.1783333, lon: -89.2583333 },
  },
  {
    id: "8760736",
    name: "Joseph Bayou",
    coords: { lat: 29.0583333, lon: -89.2716667 },
  },
  { id: "8760551", name: "South Pass", coords: { lat: 28.99, lon: -89.14 } },
  {
    id: "8760579",
    name: "Port Eads, South Pass",
    coords: { lat: 29.015, lon: -89.16 },
  },
  {
    id: "8760922",
    name: "Pilots Station East, Southwest Pass",
    coords: { lat: 28.9316667, lon: -89.4066667 },
  },
  {
    id: "8760959",
    name: "Southwest Pass",
    coords: { lat: 28.9316667, lon: -89.4283333 },
  },
  {
    id: "8760416",
    name: "Southeast Pass",
    coords: { lat: 29.1166667, lon: -89.045 },
  },
  {
    id: "8760412",
    name: "North Pass, Pass a Loutre",
    coords: { lat: 29.205, lon: -89.0366667 },
  },
  {
    id: "8760424",
    name: "Lonesome Bayou (Thomasin)",
    coords: { lat: 29.2283333, lon: -89.05 },
  },
  {
    id: "8760841",
    name: "Jack Bay",
    coords: { lat: 29.3666667, lon: -89.345 },
  },
  {
    id: "8760889",
    name: "Olga Compressor Station, Grand Bay",
    coords: { lat: 29.3866667, lon: -89.38 },
  },
  {
    id: "8761212",
    name: "Empire Jetty",
    coords: { lat: 29.25, lon: -89.6083333 },
  },
  {
    id: "8761402",
    name: "The Rigolets",
    coords: { lat: 30.1666667, lon: -89.7366667 },
  },
  {
    id: "8761487",
    name: "Chef Menteur, Chef Menteur Pass",
    coords: { lat: 30.065, lon: -89.8 },
  },
  {
    id: "8761927",
    name: "New Canal Station",
    coords: { lat: 30.0266667, lon: -90.1133333 },
  },
  {
    id: "TEC4445",
    name: "Paris Road Bridge (ICWW)",
    coords: { lat: 30.0, lon: -89.9333333 },
  },
  {
    id: "8761473",
    name: "Route 433, Bayou Bonfouca",
    coords: { lat: 30.2716667, lon: -89.7933333 },
  },
  {
    id: "8761993",
    name: "Tchefuncta River, Lake Point",
    coords: { lat: 30.3783333, lon: -90.16 },
  },
  {
    id: "8762372",
    name: "East Bank 1, Norco, Bayou LaBranche",
    coords: { lat: 30.05, lon: -90.3683333 },
  },
  {
    id: "8762483",
    name: "I-10 Bonnet Carre Floodway",
    coords: { lat: 888, lon: 888 },
  },
  {
    id: "8763535",
    name: "Texas Gas Platform, Caillou Bay",
    coords: { lat: 29.175, lon: -90.9766667 },
  },
  {
    id: "8763719",
    name: "Ship Shoal Light",
    coords: { lat: 28.915, lon: -91.0716667 },
  },
  {
    id: "8761732",
    name: "Manilla, LA",
    coords: { lat: 29.4266667, lon: -89.97667 },
  },
  {
    id: "8761899",
    name: "Lafitte, Barataria Waterway",
    coords: { lat: 29.6666667, lon: -90.111667 },
  },
];

// tide stations in LA: https://tidesandcurrents.noaa.gov/tide_predictions.html?gid=1400
// tide station map: https://tidesandcurrents.noaa.gov/map/index.html
// better map: https://tidesandcurrents.noaa.gov/map/index.html?type=TidePredictions&region=

export const getStationById = (id: string): TideStationEntity | undefined => {
  return tideStations.find((tideStation) => tideStation.id === id);
};

interface Normalized {
  time: string;
  height: number;
  type: string;
}

export async function getTidePredictions(
  start: Date,
  end: Date,
  stationId: string
): Promise<Normalized[]> {
  const cacheKey = `tide-${stationId}-${format(start, "yyyy-MM-dd")}-${format(
    end,
    "yyyy-MM-dd"
  )}`;

  // todo: figure out a way to cache tide data without hitting dynamodb limits
  //const cachedData = await getCacheVal<Normalized[]>(cacheKey, 60 * 24 * 7); // fresh for 7 days
  //if (cachedData) return cachedData;

  const [hiLoData, allData] = await Promise.all([
    fetchTideData(subDays(start, 1), addDays(end, 1), stationId, true),
    fetchTideData(start, end, stationId, false),
  ]);

  let data = allData.concat(hiLoData);

  let normalized: Normalized[] = data.map((data) => ({
    time: new Date(`${data.t}:00+00:00`).toISOString(),
    height: Number(data.v),
    type:
      data.type === "L" ? "low" : data.type === "H" ? "high" : "intermediate",
  }));

  // is this a tide station with only hi/lo values?
  if (allData.length === 0) {
    normalized = await extrapolateFromHiLow(normalized);
  }

  const result = normalized
    .filter((entry) => {
      const entryTime = new Date(entry.time);
      if (isBefore(entryTime, start) || isAfter(entryTime, end)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const aDate = new Date(a.time);
      const bDate = new Date(b.time);

      if (aDate > bDate) return 1;
      else if (aDate < bDate) return -1;

      return 0;
    });

  return result;

  // return setCacheVal(cacheKey, result);
}

interface NoaaPrediction {
  t: string;
  v: string;
  type?: "L" | "H";
}

/**
 * API docs: https://tidesandcurrents.noaa.gov/api/
 */
async function fetchTideData(
  start: Date,
  end: Date,
  stationId: string,
  onlyHighLow: boolean
): Promise<NoaaPrediction[]> {
  const params = {
    product: "predictions",
    application: "fishing",
    begin_date: formatToTimeZone(start, "YYYYMMDD HH:mm", {
      timeZone: "Etc/UTC",
    }),
    end_date: formatToTimeZone(end, "YYYYMMDD HH:mm", {
      timeZone: "Etc/UTC",
    }),
    datum: "MLLW",
    station: stationId,
    time_zone: "gmt",
    units: "english",
    interval: onlyHighLow ? "hilo" : undefined, // only High/Low tide predictions vs 6-minute intervals
    format: "json",
  };

  const url =
    `https://tidesandcurrents.noaa.gov/api/datagetter?` +
    querystring.stringify(params);

  const { data } = await axios.get<{ predictions: NoaaPrediction[] }>(url);

  return data.predictions || [];
}

async function extrapolateFromHiLow(data: Normalized[]) {
  let final: Normalized[] = [];
  for (let i = 0; i < data.length - 1; i++) {
    const a = data[i];
    const b = data[i + 1];

    // find time diff between consecutive entries
    const minuteDiff = differenceInMinutes(new Date(b.time), new Date(a.time));

    final.push(a);
    for (let j = 1; j < minuteDiff; j++) {
      // insert calculated step values
      const time = addMinutes(new Date(a.time), j);
      const percentDone = j / minuteDiff;
      final.push({
        time: time.toISOString(),
        height: lerp(a.height, b.height, inOutQuad(percentDone)),
        type: "intermediate",
      });
    }

    if (i === data.length - 2) final.push(b);
  }

  return final;
}

function lerp(v0: number, v1: number, t: number) {
  return v0 * (1 - t) + v1 * t;
}

function inOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
