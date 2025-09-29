import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new location.
 * Requires a CreateLocationInput payload.
 */
export const createLocation = graphql(`
  mutation CreateLocation($payload: CreateLocationInput!) {
    wms {
      createLocation(payload: $payload) {
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
 * Updates the name of a location.
 * Requires the ID of the location and the new name.
 */
export const updateLocationName = graphql(`
  mutation UpdateLocationName($id: UUID!, $name: String!) {
    wms {
      updateLocationName(id: $id, name: $name) {
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
 * Removes a location by its ID.
 */
export const removeLocation = graphql(`
  mutation RemoveLocation($id: UUID!) {
    wms {
      removeLocation(id: $id)
    }
  }
`);
