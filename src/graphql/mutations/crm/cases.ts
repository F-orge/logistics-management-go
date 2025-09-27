import { graphql } from "@/lib/graphql/client";

export const createCase = graphql(`
  mutation CreateCase($payload: CreateCaseInput!) {
    crm {
      createCase(payload: $payload) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const updateCaseNumber = graphql(`
  mutation UpdateCaseNumber($id: UUID!, $caseNumber: String!) {
    crm {
      updateCaseNumber(id: $id, caseNumber: $caseNumber) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const updateCaseStatus = graphql(`
  mutation UpdateCaseStatus($id: UUID!, $status: CaseStatus) {
    crm {
      updateCaseStatus(id: $id, status: $status) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const updateCasePriority = graphql(`
  mutation UpdateCasePriority($id: UUID!, $priority: CasePriority) {
    crm {
      updateCasePriority(id: $id, priority: $priority) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const updateCaseType = graphql(`
  mutation UpdateCaseType($id: UUID!, $type: CaseType) {
    crm {
      updateCaseType(id: $id, type: $type) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const updateCaseOwnerId = graphql(`
  mutation UpdateCaseOwnerId($id: UUID!, $ownerId: UUID!) {
    crm {
      updateCaseOwnerId(id: $id, ownerId: $ownerId) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const updateCaseContactId = graphql(`
  mutation UpdateCaseContactId($id: UUID!, $contactId: UUID) {
    crm {
      updateCaseContactId(id: $id, contactId: $contactId) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const updateCaseDescription = graphql(`
  mutation UpdateCaseDescription($id: UUID!, $description: String) {
    crm {
      updateCaseDescription(id: $id, description: $description) {
        id
        caseNumber
        description
        status
        priority
        type
        createdAt
        updatedAt
        owner {
          id
          name
        }
        contact {
          id
          name
        }
      }
    }
  }
`);

export const removeCase = graphql(`
  mutation RemoveCase($id: UUID!) {
    crm {
      removeCase(id: $id)
    }
  }
`);
