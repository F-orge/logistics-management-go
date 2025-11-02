import { graphql } from "../generated/gql";

export const CreateLocationMutation = graphql(`
  mutation CreateLocation($location: CreateLocationInput!) {
    wms {
      createLocation(value: $location) {
        id
      }
    }
  }
`);

export const UpdateLocationMutation = graphql(`
  mutation UpdateLocation($id: ID!, $location: UpdateLocationInput!) {
    wms {
      updateLocation(id: $id, value: $location) {
        id
      }
    }
  }
`);

export const RemoveLocationMutation = graphql(`
  mutation RemoveLocation($id: ID!) {
    wms {
      removeLocation(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableLocationQuery = graphql(`
  query TableLocation(
    $page: Int
    $perPage: Int
    $search: String
    $type: LocationType
  ) {
    wms {
      locations(page: $page, perPage: $perPage, search: $search, type: $type) {
        barcode
        createdAt
        isActive
        isPickable
        isReceivable
        id
        hazmatApproved
        level
        maxPallets
        maxVolume
        maxWeight
        name
        path
        temperatureControlled
        type
        updatedAt
        xCoordinate
        yCoordinate
        zCoordinate
        parentLocation {
          id
          name
          path
        }
        warehouse {
          address
          city
          name
          id
          isActive
        }
      }
    }
  }
`);

export const SearchLocationsQuery = graphql(`
  query SearchLocations($search: String!) {
    wms {
      locations(search: $search, page: 1, perPage: 10) {
        value: id
        label: name
      }
    }
  }
`);

export const AnalyticsLocationsQuery = graphql(`
  query AnalyticsLocations($from: Date, $to: Date) {
    wms {
      locations(from: $from, to: $to) {
        maxWeight
        maxVolume
        maxPallets
        type
      }
    }
  }
`);
