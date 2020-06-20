import gql from "graphql-tag";

const CURRENT_CONDITIONS_QUERY = gql`
  query CurrentConditionsData(
    $locationId: ID!
    $usgsSiteId: ID
    $startDate: String!
    $endDate: String!
  ) {
    location(id: $locationId) {
      id
      wind {
        summary {
          mostRecent {
            ...WindDetailFields2
          }
        }
        detail(start: $startDate, end: $endDate) {
          ...WindDetailFields2
        }
      }

      temperature {
        summary {
          mostRecent {
            temperature {
              degrees
            }
          }
        }
        detail(start: $startDate, end: $endDate) {
          timestamp
          temperature {
            degrees
          }
        }
      }
    }

    usgsSite(siteId: $usgsSiteId) {
      ...UsgsSiteDetailFields
    }
  }

  fragment UsgsSiteDetailFields on UsgsSite {
    id
    name
    salinity {
      summary {
        mostRecent {
          salinity
        }
      }
      detail(start: $startDate, end: $endDate) {
        timestamp
        salinity
      }
    }
    waterTemperature {
      summary {
        mostRecent {
          timestamp
          temperature {
            degrees
          }
        }
      }
      detail(start: $startDate, end: $endDate) {
        timestamp
        temperature {
          degrees
        }
      }
    }
    wind {
      summary {
        mostRecent {
          ...WindDetailFields2
        }
      }
      detail(start: $startDate, end: $endDate) {
        ...WindDetailFields2
      }
    }
  }

  fragment WindDetailFields2 on WindDetail {
    timestamp
    speed
    direction
    directionDegrees
  }
`;

export default CURRENT_CONDITIONS_QUERY;
