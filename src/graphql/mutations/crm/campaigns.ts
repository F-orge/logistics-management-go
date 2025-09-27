import { graphql } from "@/lib/graphql/client";

export const createCampaign = graphql(`
  mutation CreateCampaign($payload: CreateCampaignInput!) {
    crm {
      createCampaign(payload: $payload) {
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

export const updateCampaignName = graphql(`
  mutation UpdateCampaignName($id: UUID!, $name: String!) {
    crm {
      updateCampaignName(id: $id, name: $name) {
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

export const updateCampaignBudget = graphql(`
  mutation UpdateCampaignBudget($id: UUID!, $budget: Decimal!) {
    crm {
      updateCampaignBudget(id: $id, budget: $budget) {
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

export const updateCampaignStartDate = graphql(`
  mutation UpdateCampaignStartDate($id: UUID!, $startDate: NaiveDate!) {
    crm {
      updateCampaignStartDate(id: $id, startDate: $startDate) {
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

export const updateCampaignEndDate = graphql(`
  mutation UpdateCampaignEndDate($id: UUID!, $endDate: NaiveDate!) {
    crm {
      updateCampaignEndDate(id: $id, endDate: $endDate) {
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

export const removeCampaign = graphql(`
  mutation RemoveCampaign($id: UUID!) {
    crm {
      removeCampaign(id: $id)
    }
  }
`);
