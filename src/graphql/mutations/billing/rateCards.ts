import { graphql } from "@/lib/graphql/client";

// ============================================================================
// RATE CARD MUTATIONS
// ============================================================================

/**
 * Creates a new rate card.
 * @param payload The input data for creating the rate card.
 */
export const createRateCard = graphql(`
  mutation CreateRateCard($payload: CreateRateCardInput!) {
    billing {
      createRateCard(payload: $payload) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the name of a rate card.
 * @param id The UUID of the rate card to update.
 * @param name The new name.
 */
export const updateRateCardName = graphql(`
  mutation UpdateRateCardName($id: UUID!, $name: String!) {
    billing {
      updateRateCardName(id: $id, name: $name) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the service type of a rate card.
 * @param id The UUID of the rate card to update.
 * @param serviceType The new service type.
 */
export const updateRateCardServiceType = graphql(`
  mutation UpdateRateCardServiceType($id: UUID!, $serviceType: ServiceTypeEnum!) {
    billing {
      updateRateCardServiceType(id: $id, serviceType: $serviceType) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the active status of a rate card.
 * @param id The UUID of the rate card to update.
 * @param isActive The new active status.
 */
export const updateRateCardIsActive = graphql(`
  mutation UpdateRateCardIsActive($id: UUID!, $isActive: Boolean) {
    billing {
      updateRateCardIsActive(id: $id, isActive: $isActive) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the valid from date of a rate card.
 * @param id The UUID of the rate card to update.
 * @param validFrom The new valid from date.
 */
export const updateRateCardValidFrom = graphql(`
  mutation UpdateRateCardValidFrom($id: UUID!, $validFrom: NaiveDate!) {
    billing {
      updateRateCardValidFrom(id: $id, validFrom: $validFrom) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the valid to date of a rate card.
 * @param id The UUID of the rate card to update.
 * @param validTo The new valid to date.
 */
export const updateRateCardValidTo = graphql(`
  mutation UpdateRateCardValidTo($id: UUID!, $validTo: NaiveDate) {
    billing {
      updateRateCardValidTo(id: $id, validTo: $validTo) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the description of a rate card.
 * @param id The UUID of the rate card to update.
 * @param description The new description.
 */
export const updateRateCardDescription = graphql(`
  mutation UpdateRateCardDescription($id: UUID!, $description: String) {
    billing {
      updateRateCardDescription(id: $id, description: $description) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the created by user ID of a rate card.
 * @param id The UUID of the rate card to update.
 * @param createdByUserId The new created by user ID.
 */
export const updateRateCardCreatedByUserId = graphql(`
  mutation UpdateRateCardCreatedByUserId($id: UUID!, $createdByUserId: UUID) {
    billing {
      updateRateCardCreatedByUserId(id: $id, createdByUserId: $createdByUserId) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a rate card by its ID.
 * @param id The UUID of the rate card to remove.
 */
export const removeRateCard = graphql(`
  mutation RemoveRateCard($id: UUID!) {
    billing {
      removeRateCard(id: $id)
    }
  }
`);
