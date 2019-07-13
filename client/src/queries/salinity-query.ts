import gql from "graphql-tag";

const SALINITY_QUERY = gql`
  query Salinity {
    location(id: "2") {
      salinitySummary: salinity(numHours: 12) {
        summary {
          averageValue
          startTimestamp
          endTimestamp
        }
      }
    }

    detail: location(id: "2") {
      salinityDetail: salinity(numHours: 48) {
        detail {
          timestamp
          salinity
        }
      }
    }
  }
`;

export default SALINITY_QUERY;
