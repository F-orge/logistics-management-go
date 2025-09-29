import { graphql } from "@/lib/graphql/client";

// ============================================================================
// RATE RULE MUTATIONS
// ============================================================================

/**
 * Creates a new rate rule.
 * @param payload The input data for creating the rate rule.
 */
export const createRateRule = graphql(`
  mutation CreateRateRule($payload: CreateRateRuleInput!) {
    billing {
      createRateRule(payload: $payload) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the rate card ID of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param rateCardId The new rate card ID.
 */
export const updateRateRuleRateCardId = graphql(`
  mutation UpdateRateRuleRateCardId($id: UUID!, $rateCardId: UUID!) {
    billing {
      updateRateRuleRateCardId(id: $id, rateCardId: $rateCardId) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the condition of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param condition The new condition.
 */
export const updateRateRuleCondition = graphql(`
  mutation UpdateRateRuleCondition($id: UUID!, $condition: String!) {
    billing {
      updateRateRuleCondition(id: $id, condition: $condition) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the value of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param value The new value.
 */
export const updateRateRuleValue = graphql(`
  mutation UpdateRateRuleValue($id: UUID!, $value: String!) {
    billing {
      updateRateRuleValue(id: $id, value: $value) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the price of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param price The new price.
 */
export const updateRateRulePrice = graphql(`
  mutation UpdateRateRulePrice($id: UUID!, $price: Float!) {
    billing {
      updateRateRulePrice(id: $id, price: $price) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the pricing model of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param pricingModel The new pricing model.
 */
export const updateRateRulePricingModel = graphql(`
  mutation UpdateRateRulePricingModel($id: UUID!, $pricingModel: PricingModelEnum!) {
    billing {
      updateRateRulePricingModel(id: $id, pricingModel: $pricingModel) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the minimum value of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param minValue The new minimum value.
 */
export const updateRateRuleMinValue = graphql(`
  mutation UpdateRateRuleMinValue($id: UUID!, $minValue: Float) {
    billing {
      updateRateRuleMinValue(id: $id, minValue: $minValue) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the maximum value of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param maxValue The new maximum value.
 */
export const updateRateRuleMaxValue = graphql(`
  mutation UpdateRateRuleMaxValue($id: UUID!, $maxValue: Float) {
    billing {
      updateRateRuleMaxValue(id: $id, maxValue: $maxValue) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the priority of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param priority The new priority.
 */
export const updateRateRulePriority = graphql(`
  mutation UpdateRateRulePriority($id: UUID!, $priority: Int) {
    billing {
      updateRateRulePriority(id: $id, priority: $priority) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the active status of a rate rule.
 * @param id The UUID of the rate rule to update.
 * @param isActive The new active status.
 */
export const updateRateRuleIsActive = graphql(`
  mutation UpdateRateRuleIsActive($id: UUID!, $isActive: Boolean) {
    billing {
      updateRateRuleIsActive(id: $id, isActive: $isActive) {
        id
        condition
        value
        price
        pricingModel
        minValue
        maxValue
        priority
        isActive
        createdAt
        updatedAt
        rateCard {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a rate rule by its ID.
 * @param id The UUID of the rate rule to remove.
 */
export const removeRateRule = graphql(`
  mutation RemoveRateRule($id: UUID!) {
    billing {
      removeRateRule(id: $id)
    }
  }
`);
