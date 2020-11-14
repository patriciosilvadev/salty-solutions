import gql from "graphql-tag";

export const LOCATION_QUERY = gql`
  query Locations {
    locations {
      ...LocationDetail
    }
  }
  fragment TideStationDetail on TidePreditionStation {
    id
    name
    availableParams
    url
  }

  fragment UsgsSiteDetail on UsgsSite {
    id
    name
    availableParams
    url
  }

  fragment LocationDetail on Location {
    id
    name
    state
    coords {
      lat
      lon
    }
    tidePreditionStations {
      ...TideStationDetail
    }
    usgsSites {
      ...UsgsSiteDetail
    }
  }
`;
