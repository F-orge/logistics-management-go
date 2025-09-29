import { graphql } from "@/lib/graphql/client";

export const getCampaign = graphql(`
  query GetCampaign($id: UUID!) {
    crm {
      campaign(id: $id) {
        id
        name
        budget
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  }
`);

export const getCampaigns = graphql(`
  query GetCampaigns($limit: Int!, $page: Int!) {
    crm {
      campaigns(limit: $limit, page: $page) {
        id
        name
        budget
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  }
`);