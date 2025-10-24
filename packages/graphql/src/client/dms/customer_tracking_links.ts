import { graphql } from "../generated/gql";

export const CreateCustomerTrackingLinkMutation = graphql(`
  mutation CreateCustomerTrackingLink(
    $customerTrackingLink: CreateCustomerTrackingLinkInput!
  ) {
    dms {
      createCustomerTrackingLink(value: $customerTrackingLink) {
        id
      }
    }
  }
`);

export const UpdateCustomerTrackingLinkMutation = graphql(`
  mutation UpdateCustomerTrackingLink(
    $id: ID!
    $customerTrackingLink: UpdateCustomerTrackingLinkInput!
  ) {
    dms {
      updateCustomerTrackingLink(id: $id, value: $customerTrackingLink) {
        id
      }
    }
  }
`);

export const RemoveCustomerTrackingLinkMutation = graphql(`
  mutation RemoveCustomerTrackingLink($id: ID!) {
    dms {
      removeCustomerTrackingLink(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
