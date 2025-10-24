import { graphql } from "../generated/gql";

export const CreateCampaignMutation = graphql(`
  mutation CreateCampaign($campaign: CreateCampaignInput!) {
    crm {
      createCampaign(value: $campaign) {
        id
      }
    }
  }
`);

export const UpdateCampaignMutation = graphql(`
  mutation UpdateCampaign($id: ID!, $campaign: UpdateCampaignInput!) {
    crm {
      updateCampaign(id: $id, value: $campaign) {
        id
      }
    }
  }
`);

export const RemoveCampaignMutation = graphql(`
  mutation RemoveCampaign($id: ID!) {
    crm {
      removeCampaign(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
