import { graphql } from "@/lib/graphql/client";

// ============================================================================
// SURCHARGE MUTATIONS
// ============================================================================

/**
 * Creates a new surcharge.
 * @param payload The input data for creating the surcharge.
 */
export const createSurcharge = graphql(`
  mutation CreateSurcharge($payload: CreateSurchargeInput!) {
    billing {
      createSurcharge(payload: $payload) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the name of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param name The new name.
 */
export const updateSurchargeName = graphql(`
  mutation UpdateSurchargeName($id: UUID!, $name: String!) {
    billing {
      updateSurchargeName(id: $id, name: $name) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the type of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param type The new type.
 */
export const updateSurchargeType = graphql(`
  mutation UpdateSurchargeType($id: UUID!, $type: String!) {
    billing {
      updateSurchargeType(id: $id, type: $type) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the amount of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param amount The new amount.
 */
export const updateSurchargeAmount = graphql(`
  mutation UpdateSurchargeAmount($id: UUID!, $amount: Float!) {
    billing {
      updateSurchargeAmount(id: $id, amount: $amount) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the calculation method of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param calculationMethod The new calculation method.
 */
export const updateSurchargeCalculationMethod = graphql(`
  mutation UpdateSurchargeCalculationMethod($id: UUID!, $calculationMethod: SurchargeCalculationMethodEnum!) {
    billing {
      updateSurchargeCalculationMethod(id: $id, calculationMethod: $calculationMethod) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the active status of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param isActive The new active status.
 */
export const updateSurchargeIsActive = graphql(`
  mutation UpdateSurchargeIsActive($id: UUID!, $isActive: Boolean) {
    billing {
      updateSurchargeIsActive(id: $id, isActive: $isActive) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the valid from date of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param validFrom The new valid from date.
 */
export const updateSurchargeValidFrom = graphql(`
  mutation UpdateSurchargeValidFrom($id: UUID!, $validFrom: NaiveDate) {
    billing {
      updateSurchargeValidFrom(id: $id, validFrom: $validFrom) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the valid to date of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param validTo The new valid to date.
 */
export const updateSurchargeValidTo = graphql(`
  mutation UpdateSurchargeValidTo($id: UUID!, $validTo: NaiveDate) {
    billing {
      updateSurchargeValidTo(id: $id, validTo: $validTo) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the description of a surcharge.
 * @param id The UUID of the surcharge to update.
 * @param description The new description.
 */
export const updateSurchargeDescription = graphql(`
  mutation UpdateSurchargeDescription($id: UUID!, $description: String) {
    billing {
      updateSurchargeDescription(id: $id, description: $description) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a surcharge by its ID.
 * @param id The UUID of the surcharge to remove.
 */
export const removeSurcharge = graphql(`
  mutation RemoveSurcharge($id: UUID!) {
    billing {
      removeSurcharge(id: $id)
    }
  }
`);
