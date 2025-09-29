import { graphql } from "@/lib/graphql/client";

// ============================================================================
// TRIP MUTATIONS
// ============================================================================

/**
 * Creates a new trip.
 * @param payload The input data for creating the trip.
 */
export const createTrip = graphql(`
  mutation CreateTrip($payload: CreateTripInput!) {
    tms {
      createTrip(payload: $payload) {
        id
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing trip.
 * @param id The UUID of the trip to update.
 * @param payload The input data for updating the trip.
 */
export const updateTrip = graphql(`
  mutation UpdateTrip($id: UUID!, $payload: CreateTripInput!) {
    tms {
      updateTrip(id: $id, payload: $payload) {
        id
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a trip by its ID.
 * @param id The UUID of the trip to remove.
 */
export const removeTrip = graphql(`
  mutation RemoveTrip($id: UUID!) {
    tms {
      removeTrip(id: $id)
    }
  }
`);

/**
 * Adds a new trip stop to a trip.
 * @param tripId The UUID of the trip to add the stop to.
 * @param payload The input data for creating the trip stop.
 */
export const addTripStop = graphql(`
  mutation AddTripStop($tripId: UUID!, $payload: CreateTripStopInput!) {
    tms {
      addTripStop(tripId: $tripId, payload: $payload) {
        id
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing trip stop.
 * @param id The UUID of the trip stop to update.
 * @param payload The input data for updating the trip stop.
 */
export const updateTripStop = graphql(`
  mutation UpdateTripStop($id: UUID!, $payload: CreateTripStopInput!) {
    tms {
      updateTripStop(id: $id, payload: $payload) {
        id
        shipmentId
        sequence
        address
        status
        estimatedArrivalTime
        actualArrivalTime
        estimatedDepartureTime
        actualDepartureTime
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a trip stop by its ID.
 * @param id The UUID of the trip stop to remove.
 */
export const removeTripStop = graphql(`
  mutation RemoveTripStop($id: UUID!) {
    tms {
      removeTripStop(id: $id)
    }
  }
`);
