import { graphql } from "@/lib/graphql/client";

// ============================================================================
// CARRIER MUTATIONS
// ============================================================================

/**
 * Creates a new carrier.
 * @param payload The input data for creating the carrier.
 */
export const createCarrier = graphql(`
  mutation CreateCarrier($payload: CreateCarrierInput!) {
    tms {
      createCarrier(payload: $payload) {
        id
        name
        contactDetails
        servicesOffered
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the name of a carrier.
 * @param id The UUID of the carrier to update.
 * @param name The new name.
 */
export const updateCarrierName = graphql(`
  mutation UpdateCarrierName($id: UUID!, $name: String!) {
    tms {
      updateCarrierName(id: $id, name: $name) {
        id
        name
        contactDetails
        servicesOffered
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the contact details of a carrier.
 * @param id The UUID of the carrier to update.
 * @param contactDetails The new contact details.
 */
export const updateCarrierContactDetails = graphql(`
  mutation UpdateCarrierContactDetails($id: UUID!, $contactDetails: String!) {
    tms {
      updateCarrierContactDetails(id: $id, contactDetails: $contactDetails) {
        id
        name
        contactDetails
        servicesOffered
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the services offered by a carrier.
 * @param id The UUID of the carrier to update.
 * @param servicesOffered The new services offered.
 */
export const updateCarrierServicesOffered = graphql(`
  mutation UpdateCarrierServicesOffered($id: UUID!, $servicesOffered: String!) {
    tms {
      updateCarrierServicesOffered(id: $id, servicesOffered: $servicesOffered) {
        id
        name
        contactDetails
        servicesOffered
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a carrier by its ID.
 * @param id The UUID of the carrier to remove.
 */
export const removeCarrier = graphql(`
  mutation RemoveCarrier($id: UUID!) {
    tms {
      removeCarrier(id: $id)
    }
  }
`);

/**
 * Adds a new carrier rate to a carrier.
 * @param carrierId The UUID of the carrier to add the rate to.
 * @param payload The input data for creating the carrier rate.
 */
export const addCarrierRate = graphql(`
  mutation AddCarrierRate($carrierId: UUID!, $payload: CreateCarrierRateInput!) {
    tms {
      addCarrierRate(carrierId: $carrierId, payload: $payload) {
        id
        name
        contactDetails
        servicesOffered
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing carrier rate.
 * @param id The UUID of the carrier rate to update.
 * @param payload The input data for updating the carrier rate.
 */
export const updateCarrierRate = graphql(`
  mutation UpdateCarrierRate($id: UUID!, $payload: CreateCarrierRateInput!) {
    tms {
      updateCarrierRate(id: $id, payload: $payload) {
        id
        serviceType
        origin
        destination
        rate
        unit
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a carrier rate by its ID.
 * @param id The UUID of the carrier rate to remove.
 */
export const removeCarrierRate = graphql(`
  mutation RemoveCarrierRate($id: UUID!) {
    tms {
      removeCarrierRate(id: $id)
    }
  }
`);
