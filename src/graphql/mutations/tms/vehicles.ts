import { graphql } from "@/lib/graphql/client";

// ============================================================================
// VEHICLE MUTATIONS
// ============================================================================

/**
 * Creates a new vehicle.
 * @param payload The input data for creating the vehicle.
 */
export const createVehicle = graphql(`
  mutation CreateVehicle($payload: CreateVehicleInput!) {
    tms {
      createVehicle(payload: $payload) {
        id
        registrationNumber
        model
        capacityVolume
        capacityWeight
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing vehicle.
 * @param id The UUID of the vehicle to update.
 * @param payload The input data for updating the vehicle.
 */
export const updateVehicle = graphql(`
  mutation UpdateVehicle($id: UUID!, $payload: CreateVehicleInput!) {
    tms {
      updateVehicle(id: $id, payload: $payload) {
        id
        registrationNumber
        model
        capacityVolume
        capacityWeight
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a vehicle by its ID.
 * @param id The UUID of the vehicle to remove.
 */
export const removeVehicle = graphql(`
  mutation RemoveVehicle($id: UUID!) {
    tms {
      removeVehicle(id: $id)
    }
  }
`);
