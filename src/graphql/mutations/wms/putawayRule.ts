import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new putaway rule.
 * Requires a CreatePutawayRuleInput payload.
 */
export const createPutawayRule = graphql(`
  mutation CreatePutawayRule($payload: CreatePutawayRuleInput!) {
    wms {
      createPutawayRule(payload: $payload) {
        id
        locationType
        priority
        minQuantity
        maxQuantity
        weightThreshold
        volumeThreshold
        requiresTemperatureControl
        requiresHazmatApproval
        isActive
        createdAt
        updatedAt
        product {
          id
          name
        }
        client {
          id
          name
        }
        warehouse {
          id
          name
        }
        preferredLocation {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the priority of a putaway rule.
 * Requires the ID of the putaway rule and the new priority.
 */
export const updatePutawayRulePriority = graphql(`
  mutation UpdatePutawayRulePriority($id: UUID!, $priority: Int!) {
    wms {
      updatePutawayRulePriority(id: $id, priority: $priority) {
        id
        locationType
        priority
        minQuantity
        maxQuantity
        weightThreshold
        volumeThreshold
        requiresTemperatureControl
        requiresHazmatApproval
        isActive
        createdAt
        updatedAt
        product {
          id
          name
        }
        client {
          id
          name
        }
        warehouse {
          id
          name
        }
        preferredLocation {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a putaway rule by its ID.
 */
export const removePutawayRule = graphql(`
  mutation RemovePutawayRule($id: UUID!) {
    wms {
      removePutawayRule(id: $id)
    }
  }
`);
