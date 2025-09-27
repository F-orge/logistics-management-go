import { graphql } from "@/lib/graphql/client";

export const createInteraction = graphql(`
  mutation CreateInteraction($payload: CreateInteractionInput!) {
    crm {
      createInteraction(payload: $payload) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const updateInteractionContactId = graphql(`
  mutation UpdateInteractionContactId($id: UUID!, $contactId: UUID!) {
    crm {
      updateInteractionContactId(id: $id, contactId: $contactId) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const updateInteractionUserId = graphql(`
  mutation UpdateInteractionUserId($id: UUID!, $userId: UUID!) {
    crm {
      updateInteractionUserId(id: $id, userId: $userId) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const updateInteractionCaseId = graphql(`
  mutation UpdateInteractionCaseId($id: UUID!, $caseId: UUID) {
    crm {
      updateInteractionCaseId(id: $id, caseId: $caseId) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const updateInteractionType = graphql(`
  mutation UpdateInteractionType($id: UUID!, $type: InteractionType) {
    crm {
      updateInteractionType(id: $id, type: $type) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const updateInteractionOutcome = graphql(`
  mutation UpdateInteractionOutcome($id: UUID!, $outcome: String) {
    crm {
      updateInteractionOutcome(id: $id, outcome: $outcome) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const updateInteractionNotes = graphql(`
  mutation UpdateInteractionNotes($id: UUID!, $notes: String) {
    crm {
      updateInteractionNotes(id: $id, notes: $notes) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const updateInteractionInteractionDate = graphql(`
  mutation UpdateInteractionInteractionDate($id: UUID!, $interactionDate: DateTime) {
    crm {
      updateInteractionInteractionDate(id: $id, interactionDate: $interactionDate) {
        id
        interactionDate
        notes
        outcome
        type
        createdAt
        updatedAt
        user {
          id
          name
        }
        contact {
          id
          name
        }
        case {
          id
          caseNumber
        }
      }
    }
  }
`);

export const removeInteraction = graphql(`
  mutation RemoveInteraction($id: UUID!) {
    crm {
      removeInteraction(id: $id)
    }
  }
`);
