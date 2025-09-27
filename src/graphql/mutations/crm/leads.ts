import { graphql } from "@/lib/graphql/client";

export const createLead = graphql(`
  mutation CreateLead($payload: CreateLeadInput!) {
    crm {
      createLead(payload: $payload) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadName = graphql(`
  mutation UpdateLeadName($id: UUID!, $name: String!) {
    crm {
      updateLeadName(id: $id, name: $name) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadEmail = graphql(`
  mutation UpdateLeadEmail($id: UUID!, $email: String!) {
    crm {
      updateLeadEmail(id: $id, email: $email) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadLeadSource = graphql(`
  mutation UpdateLeadLeadSource($id: UUID!, $leadSource: LeadSource) {
    crm {
      updateLeadLeadSource(id: $id, leadSource: $leadSource) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadStatus = graphql(`
  mutation UpdateLeadStatus($id: UUID!, $status: LeadStatus) {
    crm {
      updateLeadStatus(id: $id, status: $status) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadLeadScore = graphql(`
  mutation UpdateLeadLeadScore($id: UUID!, $leadScore: Int) {
    crm {
      updateLeadLeadScore(id: $id, leadScore: $leadScore) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadOwnerId = graphql(`
  mutation UpdateLeadOwnerId($id: UUID!, $ownerId: UUID!) {
    crm {
      updateLeadOwnerId(id: $id, ownerId: $ownerId) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadCampaignId = graphql(`
  mutation UpdateLeadCampaignId($id: UUID!, $campaignId: UUID) {
    crm {
      updateLeadCampaignId(id: $id, campaignId: $campaignId) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadConvertedAt = graphql(`
  mutation UpdateLeadConvertedAt($id: UUID!, $convertedAt: DateTime) {
    crm {
      updateLeadConvertedAt(id: $id, convertedAt: $convertedAt) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadConvertedContactId = graphql(`
  mutation UpdateLeadConvertedContactId($id: UUID!, $convertedContactId: UUID) {
    crm {
      updateLeadConvertedContactId(id: $id, convertedContactId: $convertedContactId) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadConvertedCompanyId = graphql(`
  mutation UpdateLeadConvertedCompanyId($id: UUID!, $convertedCompanyId: UUID) {
    crm {
      updateLeadConvertedCompanyId(id: $id, convertedCompanyId: $convertedCompanyId) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const updateLeadConvertedOpportunityId = graphql(`
  mutation UpdateLeadConvertedOpportunityId($id: UUID!, $convertedOpportunityId: UUID) {
    crm {
      updateLeadConvertedOpportunityId(id: $id, convertedOpportunityId: $convertedOpportunityId) {
        id
        name
        email
        leadScore
        leadSource
        status
        convertedAt
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
        convertedContact {
          id
          name
        }
        convertedOpportunity {
          id
          name
        }
      }
    }
  }
`);

export const removeLead = graphql(`
  mutation RemoveLead($id: UUID!) {
    crm {
      removeLead(id: $id)
    }
  }
`);
