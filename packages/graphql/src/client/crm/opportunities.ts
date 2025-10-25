import { graphql } from "../generated/gql";

export const CreateOpportunityMutation = graphql(`
  mutation CreateOpportunity($opportunity: CreateOpportunityInput!) {
    crm {
      createOpportunity(value: $opportunity) {
        id
      }
    }
  }
`);

export const UpdateOpportunityMutation = graphql(`
  mutation UpdateOpportunity($id: ID!, $opportunity: UpdateOpportunityInput!) {
    crm {
      updateOpportunity(id: $id, value: $opportunity) {
        id
      }
    }
  }
`);

export const RemoveOpportunityMutation = graphql(`
  mutation RemoveOpportunity($id: ID!) {
    crm {
      removeOpportunity(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableOpportunityQuery = graphql(`
  query TableOpportunity(
    $page: Int
    $perPage: Int
    $search: String
    $source: OpportunitySource
    $stage: OpportunityStage
  ) {
    crm {
      opportunities(
        page: $page
        perPage: $perPage
        search: $search
        source: $source
        stage: $stage
      ) {
        createdAt
        dealValue
        expectedCloseDate
        id
        lostReason
        name
        probability
        source
        stage
        updatedAt
        company {
          name
          industry
          id
          country
          phoneNumber
        }
        contact {
          email
          id
          jobTitle
          name
          phoneNumber
          updatedAt
          company {
            name
            phoneNumber
            industry
            country
          }
        }
        owner {
          email
          id
          image
          name
        }
        products {
          quantity
          product {
            id
            name
            price
            sku
            type
            description
          }
        }
        campaign {
          name
          budget
          endDate
          startDate
          id
        }
      }
    }
  }
`);

export const SearchOpportunitiesQuery = graphql(`
  query SearchOpportunities($search: String!) {
    crm {
      opportunities(page: 1, perPage: 10, search: $search) {
        value: id
        label: name
      }
    }
  }
`);

export const AnalyticsOpportunitiesQuery = graphql(`
  query AnalyticsOpportunities($from: Date, $to: Date) {
    crm {
      opportunities(from: $from, to: $to) {
        dealValue
        probability
        stage
        source
      }
    }
  }
`);
