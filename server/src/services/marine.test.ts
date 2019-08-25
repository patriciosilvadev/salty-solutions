import { parseForecast } from "./marine";
import cases from "jest-in-case";

// around X feet/foot
// less than x foot/feet
// X feet/foot or less
// x to y feet

describe("marine forecast water condition parsing", () => {
  cases(
    "inshore",
    opts => {
      expect(parseForecast(opts.forecast).waterCondition).toBe(opts.expected);
    },
    [
      {
        forecast: "Bay waters choppy.",
        expected: "choppy"
      },
      {
        forecast: "Lake waters a light chop.",
        expected: "light chop"
      },
      {
        forecast: "Lake waters smooth.",
        expected: "smooth"
      },
      {
        forecast: "Seas around 1 foot. Nearshore waters a light chop.",
        expected: "light chop"
      },
      {
        forecast: "Seas 1 foot or less.",
        expected: "0-1"
      },
      {
        forecast: "Seas 1 to 2 feet.",
        expected: "1-2"
      },
      {
        forecast: "Seas 1 to 3 feet.",
        expected: "1-3"
      },
      {
        forecast: "Seas 2 to 4 feet.",
        expected: "2-4"
      },
      {
        forecast: "Waves 1 foot or less.",
        expected: "0-1"
      },
      {
        forecast: "Waves 1 to 2 feet.",
        expected: "1-2"
      },
      {
        forecast: "Waves 1 to 3 feet.",
        expected: "1-3"
      },
      {
        forecast: "Waves 2 to 4 feet.",
        expected: "2-4"
      },
      {
        forecast: "Seas 1 foot or less.",
        expected: "0-1"
      },
      {
        forecast: "Seas 2 feet or less.",
        expected: "0-2"
      },
      {
        forecast: "Seas less than 1 foot.",
        expected: "0-1"
      },
      {
        forecast: "Seas less than 2 feet.",
        expected: "0-2"
      },
      {
        forecast: "Seas around 3 feet.",
        expected: "3-3"
      },
      {
        forecast: "Seas around 1 foot.",
        expected: "1-1"
      }
    ]
  );
  // test("inshore", () => {
  //   let forecast =
  //     "Bay waters choppy. Patchy fog late in the morning. Chance of showers late in the morning. Chance of thunderstorms through the day. Showers in the afternoon.";
  //   let expected = "choppy";
  //   let { waterCondition } = parseForecast(forecast);
  //   expect(waterCondition).toBe(expected);

  //   forecast =
  //     "Lake waters a light chop. Slight chance of showers and thunderstorms late in the morning, then showers likely and chance of thunderstorms in the afternoon.";
  //   expected = "light chop";
  //   ({ waterCondition } = parseForecast(forecast));
  //   expect(waterCondition).toBe(expected);
  // });
});
