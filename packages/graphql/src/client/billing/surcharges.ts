import { graphql } from "../generated/gql";

export const CreateSurchargeMutation = graphql(`
  mutation CreateSurcharge($surcharge: CreateSurchargeInput!) {
    billing {
      createSurcharge(value: $surcharge) {
        id
      }
    }
  }
`);

export const UpdateSurchargeMutation = graphql(`
  mutation UpdateSurcharge($id: ID!, $surcharge: UpdateSurchargeInput!) {
    billing {
      updateSurcharge(id: $id, value: $surcharge) {
        id
      }
    }
  }
`);

export const RemoveSurchargeMutation = graphql(`
  mutation RemoveSurcharge($id: ID!) {
    billing {
      removeSurcharge(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableSurchargeQuery = graphql(`
  query TableSurcharge(
    $page: Int
    $perPage: Int
    $search: String
    $calculationMethod: SurchargeCalculationMethod
  ) {
    billing {
      surcharges(
        page: $page
        perPage: $perPage
        search: $search
        calculationMethod: $calculationMethod
      ) {
        amount
        calculationMethod
        createdAt
        description
        id
        isActive
        name
        type
        updatedAt
        validFrom
        validTo
      }
    }
  }
`);
