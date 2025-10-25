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

export const CustomerTrackingLinkQuery = graphql(`
  query TableCustomerTrackingLink($page: Int, $perPage: Int, $search: String) {
    dms {
      customerTrackingLinks(page: $page, perPage: $perPage, search: $search) {
        accessCount
        createdAt
        expiresAt
        id
        isActive
        lastAccessedAt
        trackingToken
        updatedAt
      }
    }
  }
`);

export const SearchCustomerTrackingLinksQuery = graphql(`
  query SearchCustomerTrackingLinks($search: String!) {
    dms {
      customerTrackingLinks(page: 1, perPage: 10, search: $search) {
        value: id
        label: trackingToken
      }
    }
  }
`);

export const AnalyticsCustomerTrackingLinksQuery = graphql(`
  query AnalyticsCustomerTrackingLinks($from: Date, $to: Date) {
    dms {
      customerTrackingLinks(from: $from, to: $to) {
        accessCount
      }
    }
  }
`);
