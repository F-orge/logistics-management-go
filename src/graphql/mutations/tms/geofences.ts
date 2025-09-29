import { graphql } from "@/lib/graphql/client";

// ============================================================================
// GEOFENCE MUTATIONS
// ============================================================================

/**
 * Creates a new geofence.
 * @param payload The input data for creating the geofence.
 */
export const createGeofence = graphql(`
  mutation CreateGeofence($payload: CreateGeofenceInput!) {
    tms {
      createGeofence(payload: $payload) {
        id
        name
        coordinates
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing geofence.
 * @param id The UUID of the geofence to update.
 * @param payload The input data for updating the geofence.
 */
export const updateGeofence = graphql(`
  mutation UpdateGeofence($id: UUID!, $payload: CreateGeofenceInput!) {
    tms {
      updateGeofence(id: $id, payload: $payload) {
        id
        name
        coordinates
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a geofence by its ID.
 * @param id The UUID of the geofence to remove.
 */
export const removeGeofence = graphql(`
  mutation RemoveGeofence($id: UUID!) {
    tms {
      removeGeofence(id: $id)
    }
  }
`);

/**
 * Creates a new geofence event.
 * @param payload The input data for creating the geofence event.
 */
export const createGeofenceEvent = graphql(`
  mutation CreateGeofenceEvent($payload: CreateGeofenceEventInput!) {
    tms {
      createGeofenceEvent(payload: $payload) {
        id
        eventType
        timestamp
      }
    }
  }
`);

/**
 * Removes a geofence event by its ID.
 * @param id The UUID of the geofence event to remove.
 */
export const removeGeofenceEvent = graphql(`
  mutation RemoveGeofenceEvent($id: UUID!) {
    tms {
      removeGeofenceEvent(id: $id)
    }
  }
`);
