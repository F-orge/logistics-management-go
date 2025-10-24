import { graphql } from "../generated/gql";

export const CreateCompanyMutation = graphql(`
  mutation CreateCompany($company: CreateCompanyInput!) {
    crm {
      createCompany(value: $company) {
        id
      }
    }
  }
`);

export const UpdateCompanyMutation = graphql(`
  mutation UpdateCompany($id: ID!, $company: UpdateCompanyInput!) {
    crm {
      updateCompany(id: $id, value: $company) {
        id
      }
    }
  }
`);

export const RemoveCompanyMutation = graphql(`
  mutation RemoveCompany($id: ID!) {
    crm {
      removeCompany(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
