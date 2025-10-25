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
        perPage: $perPage
        page: $page
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

export const SearchCasesQuery = graphql(`
  query SearchCases($search: String!) {
    crm {
      cases(page: 1, perPage: 10, search: $search) {
        value: id
        label: caseNumber
      }
    }
  }
`);

export const AnalyticsCasesQuery = graphql(`
  query AnalyticsCases($from: Date, $to: Date) {
    crm {
      cases(from: $from, to: $to) {
        status
        priority
        type
      }
    }
  }
`);
