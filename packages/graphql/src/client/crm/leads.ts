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
