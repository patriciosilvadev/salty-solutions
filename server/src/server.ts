// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import Koa from "koa";
import serverless from "serverless-http";
import { ApolloServer, makeExecutableSchema } from "apollo-server-koa";
import * as noaaService from "./services/noaa/client";
import * as locationService from "./services/location";
import * as sunMoonService from "./services/sun-and-moon";
import * as weatherService from "./services/weather/client";
import * as marineService from "./services/marine/client";
import * as usgsService from "./services/usgs/client";
import * as combinedForecastService from "./services/combined-forecast";
import * as nowcastService from "./services/nowcast";
import * as modisService from "./services/modis";
import * as saveOurLakeService from "./services/saveourlake";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import Rollbar from "rollbar";
// @ts-ignore
import { FormatErrorWithContextExtension } from "graphql-format-error-context-extension";
import traceResolvers from "@lifeomic/graphql-resolvers-xray-tracing";

var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const IS_DEV =
  process.env.SERVERLESS_STAGE === "dev" || !!process.env.LOCAL_DEV;

export interface Context {
  koaCtx: Koa.Context;
  services: {
    noaa: typeof noaaService;
    location: typeof locationService;
    sunMoon: typeof sunMoonService;
    weather: typeof weatherService;
    marine: typeof marineService;
    usgs: typeof usgsService;
    combinedForecast: typeof combinedForecastService;
    nowcast: typeof nowcastService;
    modis: typeof modisService;
    saveOurLake: typeof saveOurLakeService;
  };
  pass: any;
}

const formatError = (error: any, context: Context) => {
  rollbar.error(error, context.koaCtx.request, {
    path: error.path,
    locations: error.locations,
    ...error.extensions,
  });
  console.error({
    name: "Apollo Server Error",
    message: error.message,
    locations: error.locations,
    path: error.path,
    extensions: error.extensions,
  });
  return error;
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any,
});

if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
  traceResolvers(schema);
}

const server = new ApolloServer({
  schema,
  context: ({ ctx: koaCtx }): Context => {
    return {
      koaCtx,
      services: {
        noaa: noaaService,
        location: locationService,
        sunMoon: sunMoonService,
        weather: weatherService,
        marine: marineService,
        usgs: usgsService,
        combinedForecast: combinedForecastService,
        nowcast: nowcastService,
        modis: modisService,
        saveOurLake: saveOurLakeService,
      },
      pass: {},
    };
  },
  extensions: [() => new FormatErrorWithContextExtension(formatError)],
  playground: IS_DEV,
  introspection: IS_DEV,
});

const app = new Koa();
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    rollbar.error(err, ctx.request);
  }
});
server.applyMiddleware({ app, path: "/api", cors: true });

if (process.env.LOCAL_DEV) {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

export const graphql = serverless(app);
