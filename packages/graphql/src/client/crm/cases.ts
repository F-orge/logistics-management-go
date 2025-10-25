import { graphql } from "../generated/gql";

export const CreateCaseMutation = graphql(`
  mutation CreateCase($case: CreateCaseInput!) {
    crm {
      createCase(value: $case) {
        id
      }
    }
  }
`);

export const UpdateCaseMutation = graphql(`
  mutation UpdateCase($id: ID!, $case: UpdateCaseInput!) {
    crm {
      updateCase(id: $id, value: $case) {
        id
      }
    }
  }
`);

export const RemoveCaseMutation = graphql(`
  mutation RemoveCase($id: ID!) {
    crm {
      removeCase(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableCaseQuery = graphql(`
  query TableCase(
    $page: Int
    $perPage: Int
    $priority: CasePriority
    $status: CaseStatus
    $type: CaseType
  ) {
    crm {
      cases(
        perPage: $page
        page: $perPage
        priority: $priority
        status: $status
        type: $type
      ) {
        caseNumber
        createdAt
        description
        id
        priority
        status
        type
        updatedAt
        contact {
          id
          email
          name
          phoneNumber
          jobTitle
        }
        owner {
          id
          email
          image
          name
        }
      }
    }
  }
`);
