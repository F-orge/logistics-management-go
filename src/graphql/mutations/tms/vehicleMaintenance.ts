import { graphql } from "@/lib/graphql/client";

// ============================================================================
// VEHICLE MAINTENANCE MUTATIONS
// ============================================================================

/**
 * Creates a new vehicle maintenance record.
 * @param payload The input data for creating the vehicle maintenance record.
 */
export const createVehicleMaintenance = graphql(`
  mutation CreateVehicleMaintenance($payload: CreateVehicleMaintenanceInput!) {
    tms {
      createVehicleMaintenance(payload: $payload) {
        id
        serviceDate
        serviceType
        cost
        notes
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing vehicle maintenance record.
 * @param id The UUID of the vehicle maintenance record to update.
 * @param payload The input data for updating the vehicle maintenance record.
 */
export const updateVehicleMaintenance = graphql(`
  mutation UpdateVehicleMaintenance($id: UUID!, $payload: CreateVehicleMaintenanceInput!) {
    tms {
      updateVehicleMaintenance(id: $id, payload: $payload) {
        id
        serviceDate
        serviceType
        cost
        notes
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a vehicle maintenance record by its ID.
 * @param id The UUID of the vehicle maintenance record to remove.
 */
export const removeVehicleMaintenance = graphql(`
  mutation RemoveVehicleMaintenance($id: UUID!) {
    tms {
      removeVehicleMaintenance(id: $id)
    }
  }
`);
