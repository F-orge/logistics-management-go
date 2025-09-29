import { graphql } from "@/lib/graphql/client";

// ============================================================================
// GPS PING MUTATIONS
// ============================================================================

/**
 * Creates a new GPS ping record.
 * @param payload The input data for creating the GPS ping.
 */
export const createGpsPing = graphql(`
  mutation CreateGpsPing($payload: CreateGpsPingInput!) {
    tms {
      createGpsPing(payload: $payload) {
        id
        latitude
        longitude
        timestamp
      }
    }
  }
`);

/**
 * Removes a GPS ping record by its ID.
 * @param id The UUID of the GPS ping to remove.
 */
export const removeGpsPing = graphql(`
  mutation RemoveGpsPing($id: UUID!) {
    tms {
      removeGpsPing(id: $id)
    }
  }
`);
