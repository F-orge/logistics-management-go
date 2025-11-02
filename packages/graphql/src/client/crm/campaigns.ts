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

export const TableCampaignQuery = graphql(`
  query TableCampaign($page: Int, $perPage: Int, $search: String) {
    crm {
      campaigns(page: $page, perPage: $perPage, search: $search) {
        budget
        createdAt
        endDate
        id
        name
        startDate
        updatedAt
      }
    }
  }
`);

export const SearchCampaignsQuery = graphql(`
  query SearchCampaigns($search: String!) {
    crm {
      campaigns(page: 1, perPage: 10, search: $search) {
        value: id
        label: name
      }
    }
  }
`);

export const AnalyticsCampaignsQuery = graphql(`
  query AnalyticsCampaigns($from: Date, $to: Date) {
    crm {
      campaigns(from: $from, to: $to) {
        budget
      }
    }
  }
`);
