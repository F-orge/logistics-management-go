import { graphql } from "../generated/gql";

export const CreateLeadMutation = graphql(`
  mutation CreateLead($lead: CreateLeadInput!) {
    crm {
      createLead(value: $lead) {
        id
      }
    }
  }
`);

export const UpdateLeadMutation = graphql(`
  mutation UpdateLead($id: ID!, $lead: UpdateLeadInput!) {
    crm {
      updateLead(id: $id, value: $lead) {
        id
      }
    }
  }
`);

export const RemoveLeadMutation = graphql(`
  mutation RemoveLead($id: ID!) {
    crm {
      removeLead(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableLeadQuery = graphql(`
  query TableLead(
    $page: Int
    $perPage: Int
    $search: String
    $status: LeadStatus
    $source: LeadSource
  ) {
    crm {
      leads(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
        leadSource: $source
      ) {
        convertedAt
        createdAt
        email
        leadScore
        leadSource
        name
        id
        status
        updatedAt
        owner {
          id
          email
          image
          name
        }
        campaign {
          name
          endDate
          startDate
          budget
        }
        convertedCompany {
          name
          industry
          phoneNumber
          website
          id
        }
        convertedContact {
          email
          id
          jobTitle
          name
          phoneNumber
          updatedAt
          company {
            name
            industry
            id
          }
        }
        convertedOpportunity {
          name
          dealValue
          source
          stage
        }
      }
    }
  }
`);

export const SearchLeadsQuery = graphql(`
  query SearchLeads($search: String!) {
    crm {
      leads(page: 1, perPage: 10, search: $search) {
        value: id
        label: name
      }
    }
  }
`);

export const AnalyticsLeadsQuery = graphql(`
  query AnalyticsLeads($from: Date, $to: Date) {
    crm {
      leads(from: $from, to: $to) {
        leadScore
        status
        leadSource
      }
    }
  }
`);
