import { LocationEntity } from "./location";
import axios from "axios";
import cheerio from "cheerio";
import { parse, isValid } from "date-fns";

// https://saveourlake.org/lpbf-programs/coastal/hydrocoast-maps/pontchartrain-basin/pontchartrain-basin-hydrocoast-map-archives/
export async function getSalinityMap(
  location: LocationEntity
): Promise<string> {
  const url =
    "https://saveourlake.org/lpbf-programs/coastal/hydrocoast-maps/pontchartrain-basin/";

  const result = await axios.get(url);
  const $ = cheerio.load(result.data);

  // salinity map URL has -3/? in it
  const salinityLinks = $("a")
    .map((i, el) => $(el).attr("href"))
    .get()
    .filter(val => /download.*?\-3\/\?/.test(val));

  return salinityLinks[0];
}
