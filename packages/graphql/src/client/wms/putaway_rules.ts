import { graphql } from "../generated/gql";

export const CreatePutawayRuleMutation = graphql(`
  mutation CreatePutawayRule($putawayRule: CreatePutawayRuleInput!) {
    wms {
      createPutawayRule(value: $putawayRule) {
        id
      }
    }
  }
`);

export const UpdatePutawayRuleMutation = graphql(`
  mutation UpdatePutawayRule($id: ID!, $putawayRule: UpdatePutawayRuleInput!) {
    wms {
      updatePutawayRule(id: $id, value: $putawayRule) {
        id
      }
    }
  }
`);

export const RemovePutawayRuleMutation = graphql(`
  mutation RemovePutawayRule($id: ID!) {
    wms {
      removePutawayRule(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TablePutawayRuleQuery = graphql(`
  query TablePutawayRule(
    $page: Int
    $perPage: Int
    $locationType: LocationType
  ) {
    wms {
      putawayRules(
        locationType: $locationType
        page: $page
        perPage: $perPage
      ) {
        createdAt
        isActive
        id
        locationType
        maxQuantity
        minQuantity
        priority
        requiresHazmatApproval
        requiresTemperatureControl
        updatedAt
        volumeThreshold
        weightThreshold
        client {
          name
          industry
          country
          city
          website
          phoneNumber
        }
        product {
          barcode
          id
          costPrice
          description
          name
          sku
          status
        }
        warehouse {
          address
          city
          country
          name
          isActive
        }
      }
    }
  }
`);
