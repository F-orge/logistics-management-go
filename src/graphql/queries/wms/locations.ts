import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single location by its ID.
 */
export const getLocation = graphql(`
  query GetLocation($id: UUID!) {
    wms {
      location(id: $id) {
        id
        name
        barcode
        type
        level
        path
        maxWeight
        maxVolume
        maxPallets
        xCoordinate
        yCoordinate
        zCoordinate
        isPickable
        isReceivable
        temperatureControlled
        hazmatApproved
        isActive
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        parentLocation {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of locations with pagination.
 */
export const getLocations = graphql(`
  query GetLocations($limit: Int!, $page: Int!) {
    wms {
      locations(limit: $limit, page: $page) {
        id
        name
        barcode
        type
        level
        path
        maxWeight
        maxVolume
        maxPallets
        xCoordinate
        yCoordinate
        zCoordinate
        isPickable
        isReceivable
        temperatureControlled
        hazmatApproved
        isActive
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        parentLocation {
          id
          name
        }
      }
    }
  }
`);
