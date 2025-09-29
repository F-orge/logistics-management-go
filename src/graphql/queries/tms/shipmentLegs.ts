import { graphql } from "@/lib/graphql/client";

// ============================================================================
// SHIPMENT LEG OPERATIONS
// ============================================================================

/**
 * Fetches a single shipment leg by its ID.
 * @param id The UUID of the shipment leg.
 */
export const getShipmentLeg = graphql(`
  query GetShipmentLeg($id: UUID!) {
    tms {
      shipmentLeg(id: $id) {
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
 * Fetches a paginated list of shipment legs.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getShipmentLegs = graphql(`
  query GetShipmentLegs($limit: Int!, $page: Int!) {
    tms {
      shipmentLegs(limit: $limit, page: $page) {
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
