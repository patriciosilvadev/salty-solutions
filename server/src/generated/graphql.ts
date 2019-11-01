import { GraphQLResolveInfo } from "graphql";
import { LocationEntity } from "../services/location";
import { TideStationEntity } from "../services/tide";
import { Context } from "../server";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CombinedForecast = {
  __typename?: "CombinedForecast";
  timePeriod: Scalars["String"];
  wind: WindForecast;
  waterCondition?: Maybe<WaterCondition>;
  temperature: Temperature;
  marine?: Maybe<Scalars["String"]>;
  short: Scalars["String"];
  detailed: Scalars["String"];
  chanceOfPrecipitation?: Maybe<Scalars["Int"]>;
  icon: Scalars["String"];
};

export type CurrentWind = {
  __typename?: "CurrentWind";
  speed: Scalars["Float"];
  direction: Scalars["String"];
  directionDegrees: Scalars["Float"];
};

export type DataSources = {
  __typename?: "DataSources";
  tideStationIds: Array<Scalars["String"]>;
  marineZoneId: Scalars["String"];
  usgsSiteId: Scalars["String"];
  weatherStationId: Scalars["String"];
  weatherRadarSiteId: Scalars["String"];
};

export type ForecastWindSpeedDetail = {
  __typename?: "ForecastWindSpeedDetail";
  from: Scalars["Int"];
  to: Scalars["Int"];
};

export type Location = {
  __typename?: "Location";
  id: Scalars["ID"];
  name: Scalars["String"];
  tidePreditionStations: Array<TidePreditionStation>;
  lat: Scalars["Float"];
  long: Scalars["Float"];
  sun?: Maybe<Array<SunDetail>>;
  moon?: Maybe<Array<MoonDetail>>;
  combinedForecast: Array<CombinedForecast>;
  weatherForecast?: Maybe<Array<WeatherForecast>>;
  hourlyWeatherForecast?: Maybe<Array<WeatherForecast>>;
  marineForecast?: Maybe<Array<MarineForecast>>;
  waterHeight?: Maybe<Array<WaterHeight>>;
  waterTemperature: WaterTemperature;
  wind: Wind;
  salinity: Salinity;
  temperature: TemperatureResult;
  maps?: Maybe<Maps>;
  dataSources?: Maybe<DataSources>;
  modisMaps: Array<ModusMap>;
  salinityMap: Scalars["String"];
};

export type LocationSunArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
};

export type LocationMoonArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
};

export type LocationWaterHeightArgs = {
  numDays?: Maybe<Scalars["Int"]>;
};

export type LocationWaterTemperatureArgs = {
  numDays?: Maybe<Scalars["Int"]>;
};

export type LocationSalinityArgs = {
  numHours?: Maybe<Scalars["Int"]>;
};

export type LocationModisMapsArgs = {
  numDays?: Maybe<Scalars["Int"]>;
};

export type Map = {
  __typename?: "Map";
  imageUrl: Scalars["String"];
  timestamp: Scalars["String"];
};

export type Maps = {
  __typename?: "Maps";
  radar: Array<Map>;
  overlays: Overlays;
};

export type MapsRadarArgs = {
  numImages?: Maybe<Scalars["Int"]>;
};

export type MarineForecast = {
  __typename?: "MarineForecast";
  timePeriod: Scalars["String"];
  forecast: MarineForecastDetail;
};

export type MarineForecastDetail = {
  __typename?: "MarineForecastDetail";
  text: Scalars["String"];
  waterCondition?: Maybe<Scalars["String"]>;
  windSpeed?: Maybe<ForecastWindSpeedDetail>;
  windDirection?: Maybe<WindDirection>;
};

export type ModisMapEntry = {
  __typename?: "ModisMapEntry";
  url: Scalars["String"];
  width: Scalars["Int"];
  height: Scalars["Int"];
};

export type ModusMap = {
  __typename?: "ModusMap";
  date: Scalars["String"];
  small: ModisMapEntry;
  medium: ModisMapEntry;
  large: ModisMapEntry;
};

export type MoonDetail = {
  __typename?: "MoonDetail";
  date: Scalars["String"];
  phase: Scalars["String"];
  illumination: Scalars["Int"];
};

export type Overlays = {
  __typename?: "Overlays";
  topo: Scalars["String"];
  counties: Scalars["String"];
  rivers: Scalars["String"];
  highways: Scalars["String"];
  cities: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  locations: Array<Location>;
  location?: Maybe<Location>;
  tidePreditionStation?: Maybe<TidePreditionStation>;
};

export type QueryLocationArgs = {
  id: Scalars["ID"];
};

export type QueryTidePreditionStationArgs = {
  stationId: Scalars["ID"];
};

export type Salinity = {
  __typename?: "Salinity";
  summary?: Maybe<SalinitySummary>;
  detail?: Maybe<Array<SalinityDetail>>;
};

export type SalinityDetail = {
  __typename?: "SalinityDetail";
  timestamp: Scalars["String"];
  /** parts per thousand */
  salinity: Scalars["Float"];
};

export type SalinitySummary = {
  __typename?: "SalinitySummary";
  /** parts per thousand */
  mostRecent?: Maybe<SalinityDetail>;
};

export type SunDetail = {
  __typename?: "SunDetail";
  date: Scalars["String"];
  sunrise: Scalars["String"];
  sunset: Scalars["String"];
  dawn: Scalars["String"];
  dusk: Scalars["String"];
  nauticalDawn: Scalars["String"];
  nauticalDusk: Scalars["String"];
};

export type Temperature = {
  __typename?: "Temperature";
  degrees: Scalars["Float"];
  unit: Scalars["String"];
};

export type TemperatureDetail = {
  __typename?: "TemperatureDetail";
  timestamp: Scalars["String"];
  temperature: Temperature;
};

export type TemperatureResult = {
  __typename?: "TemperatureResult";
  summary: TemperatureSummary;
  detail?: Maybe<Array<TemperatureDetail>>;
};

export type TemperatureResultDetailArgs = {
  numHours?: Maybe<Scalars["Int"]>;
};

export type TemperatureSummary = {
  __typename?: "TemperatureSummary";
  mostRecent: TemperatureDetail;
};

export type TideDetail = {
  __typename?: "TideDetail";
  time: Scalars["String"];
  height: Scalars["Float"];
  type: Scalars["String"];
};

export type TidePreditionStation = {
  __typename?: "TidePreditionStation";
  id: Scalars["ID"];
  name: Scalars["String"];
  url: Scalars["String"];
  lat: Scalars["Float"];
  long: Scalars["Float"];
  tides?: Maybe<Array<TideDetail>>;
};

export type TidePreditionStationTidesArgs = {
  start: Scalars["String"];
  end: Scalars["String"];
};

export type WaterCondition = {
  __typename?: "WaterCondition";
  text: Scalars["String"];
  icon: Scalars["String"];
};

export type WaterHeight = {
  __typename?: "WaterHeight";
  timestamp: Scalars["String"];
  /** measured in feet */
  height: Scalars["Float"];
};

export type WaterTemperature = {
  __typename?: "WaterTemperature";
  summary: WaterTemperatureSummary;
  detail?: Maybe<Array<TemperatureDetail>>;
};

export type WaterTemperatureDetailArgs = {
  numHours?: Maybe<Scalars["Int"]>;
};

export type WaterTemperatureSummary = {
  __typename?: "WaterTemperatureSummary";
  mostRecent?: Maybe<TemperatureDetail>;
};

export type WeatherForecast = {
  __typename?: "WeatherForecast";
  name: Scalars["String"];
  startTime: Scalars["String"];
  endTime: Scalars["String"];
  isDaytime: Scalars["Boolean"];
  temperature: Temperature;
  windSpeed?: Maybe<ForecastWindSpeedDetail>;
  windDirection?: Maybe<WindDirection>;
  icon: Scalars["String"];
  shortForecast: Scalars["String"];
  detailedForecast: Scalars["String"];
  chanceOfPrecipitation?: Maybe<Scalars["Int"]>;
};

export type Wind = {
  __typename?: "Wind";
  summary: WindSummary;
  detail?: Maybe<Array<WindDetail>>;
};

export type WindDetailArgs = {
  numHours?: Maybe<Scalars["Int"]>;
};

export type WindDetail = {
  __typename?: "WindDetail";
  timestamp: Scalars["String"];
  /** miles per hour */
  speed: Scalars["Float"];
  direction: Scalars["String"];
  directionDegrees: Scalars["Float"];
};

export type WindDirection = {
  __typename?: "WindDirection";
  text: Scalars["String"];
  degrees: Scalars["Int"];
};

export type WindForecast = {
  __typename?: "WindForecast";
  speed?: Maybe<ForecastWindSpeedDetail>;
  direction?: Maybe<WindDirection>;
};

export type WindSummary = {
  __typename?: "WindSummary";
  mostRecent?: Maybe<WindDetail>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Location: ResolverTypeWrapper<LocationEntity>;
  ID: ResolverTypeWrapper<Partial<Scalars["ID"]>>;
  String: ResolverTypeWrapper<Partial<Scalars["String"]>>;
  TidePreditionStation: ResolverTypeWrapper<TideStationEntity>;
  Float: ResolverTypeWrapper<Partial<Scalars["Float"]>>;
  TideDetail: ResolverTypeWrapper<Partial<TideDetail>>;
  SunDetail: ResolverTypeWrapper<Partial<SunDetail>>;
  MoonDetail: ResolverTypeWrapper<Partial<MoonDetail>>;
  Int: ResolverTypeWrapper<Partial<Scalars["Int"]>>;
  CombinedForecast: ResolverTypeWrapper<Partial<CombinedForecast>>;
  WindForecast: ResolverTypeWrapper<Partial<WindForecast>>;
  ForecastWindSpeedDetail: ResolverTypeWrapper<
    Partial<ForecastWindSpeedDetail>
  >;
  WindDirection: ResolverTypeWrapper<Partial<WindDirection>>;
  WaterCondition: ResolverTypeWrapper<Partial<WaterCondition>>;
  Temperature: ResolverTypeWrapper<Partial<Temperature>>;
  WeatherForecast: ResolverTypeWrapper<Partial<WeatherForecast>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars["Boolean"]>>;
  MarineForecast: ResolverTypeWrapper<Partial<MarineForecast>>;
  MarineForecastDetail: ResolverTypeWrapper<Partial<MarineForecastDetail>>;
  WaterHeight: ResolverTypeWrapper<Partial<WaterHeight>>;
  WaterTemperature: ResolverTypeWrapper<
    Partial<WaterTemperature> & { location: LocationEntity }
  >;
  WaterTemperatureSummary: ResolverTypeWrapper<
    Partial<WaterTemperatureSummary>
  >;
  TemperatureDetail: ResolverTypeWrapper<Partial<TemperatureDetail>>;
  Wind: ResolverTypeWrapper<Partial<Wind> & { location: LocationEntity }>;
  WindSummary: ResolverTypeWrapper<Partial<WindSummary>>;
  WindDetail: ResolverTypeWrapper<Partial<WindDetail>>;
  Salinity: ResolverTypeWrapper<
    Partial<Salinity> & { location: LocationEntity; numHours?: Maybe<number> }
  >;
  SalinitySummary: ResolverTypeWrapper<Partial<SalinitySummary>>;
  SalinityDetail: ResolverTypeWrapper<Partial<SalinityDetail>>;
  TemperatureResult: ResolverTypeWrapper<
    Partial<TemperatureResult> & { location: LocationEntity }
  >;
  TemperatureSummary: ResolverTypeWrapper<Partial<TemperatureSummary>>;
  Maps: ResolverTypeWrapper<Partial<Maps> & { location: LocationEntity }>;
  Map: ResolverTypeWrapper<Partial<Map>>;
  Overlays: ResolverTypeWrapper<Partial<Overlays>>;
  DataSources: ResolverTypeWrapper<Partial<DataSources>>;
  ModusMap: ResolverTypeWrapper<Partial<ModusMap>>;
  ModisMapEntry: ResolverTypeWrapper<Partial<ModisMapEntry>>;
  CurrentWind: ResolverTypeWrapper<Partial<CurrentWind>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Location: LocationEntity;
  ID: Partial<Scalars["ID"]>;
  String: Partial<Scalars["String"]>;
  TidePreditionStation: TideStationEntity;
  Float: Partial<Scalars["Float"]>;
  TideDetail: Partial<TideDetail>;
  SunDetail: Partial<SunDetail>;
  MoonDetail: Partial<MoonDetail>;
  Int: Partial<Scalars["Int"]>;
  CombinedForecast: Partial<CombinedForecast>;
  WindForecast: Partial<WindForecast>;
  ForecastWindSpeedDetail: Partial<ForecastWindSpeedDetail>;
  WindDirection: Partial<WindDirection>;
  WaterCondition: Partial<WaterCondition>;
  Temperature: Partial<Temperature>;
  WeatherForecast: Partial<WeatherForecast>;
  Boolean: Partial<Scalars["Boolean"]>;
  MarineForecast: Partial<MarineForecast>;
  MarineForecastDetail: Partial<MarineForecastDetail>;
  WaterHeight: Partial<WaterHeight>;
  WaterTemperature: Partial<WaterTemperature> & { location: LocationEntity };
  WaterTemperatureSummary: Partial<WaterTemperatureSummary>;
  TemperatureDetail: Partial<TemperatureDetail>;
  Wind: Partial<Wind> & { location: LocationEntity };
  WindSummary: Partial<WindSummary>;
  WindDetail: Partial<WindDetail>;
  Salinity: Partial<Salinity> & {
    location: LocationEntity;
    numHours?: Maybe<number>;
  };
  SalinitySummary: Partial<SalinitySummary>;
  SalinityDetail: Partial<SalinityDetail>;
  TemperatureResult: Partial<TemperatureResult> & { location: LocationEntity };
  TemperatureSummary: Partial<TemperatureSummary>;
  Maps: Partial<Maps> & { location: LocationEntity };
  Map: Partial<Map>;
  Overlays: Partial<Overlays>;
  DataSources: Partial<DataSources>;
  ModusMap: Partial<ModusMap>;
  ModisMapEntry: Partial<ModisMapEntry>;
  CurrentWind: Partial<CurrentWind>;
};

export type CombinedForecastResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["CombinedForecast"]
> = {
  timePeriod?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  wind?: Resolver<ResolversTypes["WindForecast"], ParentType, ContextType>;
  waterCondition?: Resolver<
    Maybe<ResolversTypes["WaterCondition"]>,
    ParentType,
    ContextType
  >;
  temperature?: Resolver<
    ResolversTypes["Temperature"],
    ParentType,
    ContextType
  >;
  marine?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  short?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  detailed?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  chanceOfPrecipitation?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  icon?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type CurrentWindResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["CurrentWind"]
> = {
  speed?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  direction?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  directionDegrees?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
};

export type DataSourcesResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["DataSources"]
> = {
  tideStationIds?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  marineZoneId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  usgsSiteId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  weatherStationId?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  weatherRadarSiteId?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
};

export type ForecastWindSpeedDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["ForecastWindSpeedDetail"]
> = {
  from?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  to?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Location"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tidePreditionStations?: Resolver<
    Array<ResolversTypes["TidePreditionStation"]>,
    ParentType,
    ContextType
  >;
  lat?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  long?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  sun?: Resolver<
    Maybe<Array<ResolversTypes["SunDetail"]>>,
    ParentType,
    ContextType,
    LocationSunArgs
  >;
  moon?: Resolver<
    Maybe<Array<ResolversTypes["MoonDetail"]>>,
    ParentType,
    ContextType,
    LocationMoonArgs
  >;
  combinedForecast?: Resolver<
    Array<ResolversTypes["CombinedForecast"]>,
    ParentType,
    ContextType
  >;
  weatherForecast?: Resolver<
    Maybe<Array<ResolversTypes["WeatherForecast"]>>,
    ParentType,
    ContextType
  >;
  hourlyWeatherForecast?: Resolver<
    Maybe<Array<ResolversTypes["WeatherForecast"]>>,
    ParentType,
    ContextType
  >;
  marineForecast?: Resolver<
    Maybe<Array<ResolversTypes["MarineForecast"]>>,
    ParentType,
    ContextType
  >;
  waterHeight?: Resolver<
    Maybe<Array<ResolversTypes["WaterHeight"]>>,
    ParentType,
    ContextType,
    LocationWaterHeightArgs
  >;
  waterTemperature?: Resolver<
    ResolversTypes["WaterTemperature"],
    ParentType,
    ContextType,
    LocationWaterTemperatureArgs
  >;
  wind?: Resolver<ResolversTypes["Wind"], ParentType, ContextType>;
  salinity?: Resolver<
    ResolversTypes["Salinity"],
    ParentType,
    ContextType,
    LocationSalinityArgs
  >;
  temperature?: Resolver<
    ResolversTypes["TemperatureResult"],
    ParentType,
    ContextType
  >;
  maps?: Resolver<Maybe<ResolversTypes["Maps"]>, ParentType, ContextType>;
  dataSources?: Resolver<
    Maybe<ResolversTypes["DataSources"]>,
    ParentType,
    ContextType
  >;
  modisMaps?: Resolver<
    Array<ResolversTypes["ModusMap"]>,
    ParentType,
    ContextType,
    LocationModisMapsArgs
  >;
  salinityMap?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type MapResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Map"]
> = {
  imageUrl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type MapsResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Maps"]
> = {
  radar?: Resolver<
    Array<ResolversTypes["Map"]>,
    ParentType,
    ContextType,
    MapsRadarArgs
  >;
  overlays?: Resolver<ResolversTypes["Overlays"], ParentType, ContextType>;
};

export type MarineForecastResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["MarineForecast"]
> = {
  timePeriod?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  forecast?: Resolver<
    ResolversTypes["MarineForecastDetail"],
    ParentType,
    ContextType
  >;
};

export type MarineForecastDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["MarineForecastDetail"]
> = {
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  waterCondition?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  windSpeed?: Resolver<
    Maybe<ResolversTypes["ForecastWindSpeedDetail"]>,
    ParentType,
    ContextType
  >;
  windDirection?: Resolver<
    Maybe<ResolversTypes["WindDirection"]>,
    ParentType,
    ContextType
  >;
};

export type ModisMapEntryResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["ModisMapEntry"]
> = {
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  width?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  height?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type ModusMapResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["ModusMap"]
> = {
  date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  small?: Resolver<ResolversTypes["ModisMapEntry"], ParentType, ContextType>;
  medium?: Resolver<ResolversTypes["ModisMapEntry"], ParentType, ContextType>;
  large?: Resolver<ResolversTypes["ModisMapEntry"], ParentType, ContextType>;
};

export type MoonDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["MoonDetail"]
> = {
  date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phase?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  illumination?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type OverlaysResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Overlays"]
> = {
  topo?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  counties?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rivers?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  highways?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  cities?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Query"]
> = {
  locations?: Resolver<
    Array<ResolversTypes["Location"]>,
    ParentType,
    ContextType
  >;
  location?: Resolver<
    Maybe<ResolversTypes["Location"]>,
    ParentType,
    ContextType,
    QueryLocationArgs
  >;
  tidePreditionStation?: Resolver<
    Maybe<ResolversTypes["TidePreditionStation"]>,
    ParentType,
    ContextType,
    QueryTidePreditionStationArgs
  >;
};

export type SalinityResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Salinity"]
> = {
  summary?: Resolver<
    Maybe<ResolversTypes["SalinitySummary"]>,
    ParentType,
    ContextType
  >;
  detail?: Resolver<
    Maybe<Array<ResolversTypes["SalinityDetail"]>>,
    ParentType,
    ContextType
  >;
};

export type SalinityDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["SalinityDetail"]
> = {
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  salinity?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
};

export type SalinitySummaryResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["SalinitySummary"]
> = {
  mostRecent?: Resolver<
    Maybe<ResolversTypes["SalinityDetail"]>,
    ParentType,
    ContextType
  >;
};

export type SunDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["SunDetail"]
> = {
  date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sunrise?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  sunset?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  dawn?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  dusk?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nauticalDawn?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nauticalDusk?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type TemperatureResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Temperature"]
> = {
  degrees?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type TemperatureDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["TemperatureDetail"]
> = {
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  temperature?: Resolver<
    ResolversTypes["Temperature"],
    ParentType,
    ContextType
  >;
};

export type TemperatureResultResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["TemperatureResult"]
> = {
  summary?: Resolver<
    ResolversTypes["TemperatureSummary"],
    ParentType,
    ContextType
  >;
  detail?: Resolver<
    Maybe<Array<ResolversTypes["TemperatureDetail"]>>,
    ParentType,
    ContextType,
    TemperatureResultDetailArgs
  >;
};

export type TemperatureSummaryResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["TemperatureSummary"]
> = {
  mostRecent?: Resolver<
    ResolversTypes["TemperatureDetail"],
    ParentType,
    ContextType
  >;
};

export type TideDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["TideDetail"]
> = {
  time?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type TidePreditionStationResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["TidePreditionStation"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  long?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  tides?: Resolver<
    Maybe<Array<ResolversTypes["TideDetail"]>>,
    ParentType,
    ContextType,
    TidePreditionStationTidesArgs
  >;
};

export type WaterConditionResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WaterCondition"]
> = {
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type WaterHeightResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WaterHeight"]
> = {
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
};

export type WaterTemperatureResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WaterTemperature"]
> = {
  summary?: Resolver<
    ResolversTypes["WaterTemperatureSummary"],
    ParentType,
    ContextType
  >;
  detail?: Resolver<
    Maybe<Array<ResolversTypes["TemperatureDetail"]>>,
    ParentType,
    ContextType,
    WaterTemperatureDetailArgs
  >;
};

export type WaterTemperatureSummaryResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WaterTemperatureSummary"]
> = {
  mostRecent?: Resolver<
    Maybe<ResolversTypes["TemperatureDetail"]>,
    ParentType,
    ContextType
  >;
};

export type WeatherForecastResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WeatherForecast"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isDaytime?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  temperature?: Resolver<
    ResolversTypes["Temperature"],
    ParentType,
    ContextType
  >;
  windSpeed?: Resolver<
    Maybe<ResolversTypes["ForecastWindSpeedDetail"]>,
    ParentType,
    ContextType
  >;
  windDirection?: Resolver<
    Maybe<ResolversTypes["WindDirection"]>,
    ParentType,
    ContextType
  >;
  icon?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  shortForecast?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  detailedForecast?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  chanceOfPrecipitation?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
};

export type WindResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["Wind"]
> = {
  summary?: Resolver<ResolversTypes["WindSummary"], ParentType, ContextType>;
  detail?: Resolver<
    Maybe<Array<ResolversTypes["WindDetail"]>>,
    ParentType,
    ContextType,
    WindDetailArgs
  >;
};

export type WindDetailResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WindDetail"]
> = {
  timestamp?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  speed?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  direction?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  directionDegrees?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
};

export type WindDirectionResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WindDirection"]
> = {
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  degrees?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type WindForecastResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WindForecast"]
> = {
  speed?: Resolver<
    Maybe<ResolversTypes["ForecastWindSpeedDetail"]>,
    ParentType,
    ContextType
  >;
  direction?: Resolver<
    Maybe<ResolversTypes["WindDirection"]>,
    ParentType,
    ContextType
  >;
};

export type WindSummaryResolvers<
  ContextType = Context,
  ParentType = ResolversParentTypes["WindSummary"]
> = {
  mostRecent?: Resolver<
    Maybe<ResolversTypes["WindDetail"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = Context> = {
  CombinedForecast?: CombinedForecastResolvers<ContextType>;
  CurrentWind?: CurrentWindResolvers<ContextType>;
  DataSources?: DataSourcesResolvers<ContextType>;
  ForecastWindSpeedDetail?: ForecastWindSpeedDetailResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Map?: MapResolvers<ContextType>;
  Maps?: MapsResolvers<ContextType>;
  MarineForecast?: MarineForecastResolvers<ContextType>;
  MarineForecastDetail?: MarineForecastDetailResolvers<ContextType>;
  ModisMapEntry?: ModisMapEntryResolvers<ContextType>;
  ModusMap?: ModusMapResolvers<ContextType>;
  MoonDetail?: MoonDetailResolvers<ContextType>;
  Overlays?: OverlaysResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Salinity?: SalinityResolvers<ContextType>;
  SalinityDetail?: SalinityDetailResolvers<ContextType>;
  SalinitySummary?: SalinitySummaryResolvers<ContextType>;
  SunDetail?: SunDetailResolvers<ContextType>;
  Temperature?: TemperatureResolvers<ContextType>;
  TemperatureDetail?: TemperatureDetailResolvers<ContextType>;
  TemperatureResult?: TemperatureResultResolvers<ContextType>;
  TemperatureSummary?: TemperatureSummaryResolvers<ContextType>;
  TideDetail?: TideDetailResolvers<ContextType>;
  TidePreditionStation?: TidePreditionStationResolvers<ContextType>;
  WaterCondition?: WaterConditionResolvers<ContextType>;
  WaterHeight?: WaterHeightResolvers<ContextType>;
  WaterTemperature?: WaterTemperatureResolvers<ContextType>;
  WaterTemperatureSummary?: WaterTemperatureSummaryResolvers<ContextType>;
  WeatherForecast?: WeatherForecastResolvers<ContextType>;
  Wind?: WindResolvers<ContextType>;
  WindDetail?: WindDetailResolvers<ContextType>;
  WindDirection?: WindDirectionResolvers<ContextType>;
  WindForecast?: WindForecastResolvers<ContextType>;
  WindSummary?: WindSummaryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
