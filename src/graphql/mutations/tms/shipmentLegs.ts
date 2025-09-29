import { graphql } from "@/lib/graphql/client";

// ============================================================================
// SHIPMENT LEG MUTATIONS
// ============================================================================

/**
 * Creates a new shipment leg.
 * @param payload The input data for creating the shipment leg.
 */
export const createShipmentLeg = graphql(`
  mutation CreateShipmentLeg($payload: CreateShipmentLegInput!) {
    tms {
      createShipmentLeg(payload: $payload) {
        id
        shipmentId
        legSequence
        startLocation
        endLocation
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing shipment leg.
 * @param id The UUID of the shipment leg to update.
 * @param payload The input data for updating the shipment leg.
 */
export const updateShipmentLeg = graphql(`
  mutation UpdateShipmentLeg($id: UUID!, $payload: CreateShipmentLegInput!) {
    tms {
      updateShipmentLeg(id: $id, payload: $payload) {
        id
        shipmentId
        legSequence
        startLocation
        endLocation
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a shipment leg by its ID.
 * @param id The UUID of the shipment leg to remove.
 */
export const removeShipmentLeg = graphql(`
  mutation RemoveShipmentLeg($id: UUID!) {
    tms {
      removeShipmentLeg(id: $id)
    }
  }
`);

/**
 * Adds a new shipment leg event to a shipment leg.
 * @param shipmentLegId The UUID of the shipment leg to add the event to.
 * @param payload The input data for creating the shipment leg event.
 */
export const addShipmentLegEvent = graphql(`
  mutation AddShipmentLegEvent($shipmentLegId: UUID!, $payload: CreateShipmentLegEventInput!) {
    tms {
      addShipmentLegEvent(shipmentLegId: $shipmentLegId, payload: $payload) {
        id
        shipmentId
        legSequence
        startLocation
        endLocation
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing shipment leg event.
 * @param id The UUID of the shipment leg event to update.
 * @param payload The input data for updating the shipment leg event.
 */
export const updateShipmentLegEvent = graphql(`
  mutation UpdateShipmentLegEvent($id: UUID!, $payload: CreateShipmentLegEventInput!) {
    tms {
      updateShipmentLegEvent(id: $id, payload: $payload) {
        id
        statusMessage
        location
        eventTimestamp
      }
    }
  }
`);

/**
 * Removes a shipment leg event by its ID.
 * @param id The UUID of the shipment leg event to remove.
 */
export const removeShipmentLegEvent = graphql(`
  mutation RemoveShipmentLegEvent($id: UUID!) {
    tms {
      removeShipmentLegEvent(id: $id)
    }
  }
`);
