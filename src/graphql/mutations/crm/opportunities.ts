import { graphql } from "@/lib/graphql/client";

export const createOpportunity = graphql(`
  mutation CreateOpportunity($payload: CreateOpportunityInput!) {
    crm {
      createOpportunity(payload: $payload) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityName = graphql(`
  mutation UpdateOpportunityName($id: UUID!, $name: String!) {
    crm {
      updateOpportunityName(id: $id, name: $name) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityStage = graphql(`
  mutation UpdateOpportunityStage($id: UUID!, $stage: OpportunityStage) {
    crm {
      updateOpportunityStage(id: $id, stage: $stage) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityDealValue = graphql(`
  mutation UpdateOpportunityDealValue($id: UUID!, $dealValue: Decimal) {
    crm {
      updateOpportunityDealValue(id: $id, dealValue: $dealValue) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityProbability = graphql(`
  mutation UpdateOpportunityProbability($id: UUID!, $probability: Float) {
    crm {
      updateOpportunityProbability(id: $id, probability: $probability) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityExpectedCloseDate = graphql(`
  mutation UpdateOpportunityExpectedCloseDate($id: UUID!, $expectedCloseDate: NaiveDate) {
    crm {
      updateOpportunityExpectedCloseDate(id: $id, expectedCloseDate: $expectedCloseDate) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityLostReason = graphql(`
  mutation UpdateOpportunityLostReason($id: UUID!, $lostReason: String) {
    crm {
      updateOpportunityLostReason(id: $id, lostReason: $lostReason) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunitySource = graphql(`
  mutation UpdateOpportunitySource($id: UUID!, $source: OpportunitySource) {
    crm {
      updateOpportunitySource(id: $id, source: $source) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityOwnerId = graphql(`
  mutation UpdateOpportunityOwnerId($id: UUID!, $ownerId: UUID!) {
    crm {
      updateOpportunityOwnerId(id: $id, ownerId: $ownerId) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityContactId = graphql(`
  mutation UpdateOpportunityContactId($id: UUID!, $contactId: UUID) {
    crm {
      updateOpportunityContactId(id: $id, contactId: $contactId) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityCompanyId = graphql(`
  mutation UpdateOpportunityCompanyId($id: UUID!, $companyId: UUID) {
    crm {
      updateOpportunityCompanyId(id: $id, companyId: $companyId) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const updateOpportunityCampaignId = graphql(`
  mutation UpdateOpportunityCampaignId($id: UUID!, $campaignId: UUID) {
    crm {
      updateOpportunityCampaignId(id: $id, campaignId: $campaignId) {
        id
        name
        dealValue
        probability
        expectedCloseDate
        lostReason
        stage
        source
        createdAt
        updatedAt
        owner {
          id
          name
        }
        campaign {
          id
          name
        }
        company {
          id
          name
        }
        contact {
          id
          name
        }
        products(limit: 10, page: 1) {
          id
          name
        }
      }
    }
  }
`);

export const removeOpportunity = graphql(`
  mutation RemoveOpportunity($id: UUID!) {
    crm {
      removeOpportunity(id: $id)
    }
  }
`);
