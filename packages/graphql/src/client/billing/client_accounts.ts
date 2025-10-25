import { graphql } from "../generated/gql";

export const CreateClientAccountMutation = graphql(`
  mutation CreateClientAccount($clientAccount: CreateClientAccountInput!) {
    billing {
      createClientAccount(value: $clientAccount) {
        id
      }
    }
  }
`);

export const UpdateClientAccountMutation = graphql(`
  mutation UpdateClientAccount(
    $id: ID!
    $clientAccount: UpdateClientAccountInput!
  ) {
    billing {
      updateClientAccount(id: $id, value: $clientAccount) {
        id
      }
    }
  }
`);

export const RemoveClientAccountMutation = graphql(`
  mutation RemoveClientAccount($id: ID!) {
    billing {
      removeClientAccount(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableClientAccountQuery = graphql(`
  query TableClientAccount($page: Int, $perPage: Int, $search: String) {
    billing {
      clientAccounts(page: $page, perPage: $perPage, search: $search) {
        availableCredit
        client {
          annualRevenue
          country
          industry
          name
          phoneNumber
          updatedAt
          website
        }
        creditLimit
        currency
        isCreditApproved
        lastPaymentDate
        paymentTermsDays
        updatedAt
        walletBalance
        id
        transactions {
          amount
          description
          id
          referenceNumber
          runningBalance
          sourceRecordId
          sourceRecordType
          transactionDate
          type
        }
      }
    }
  }
`);

export const SearchClientAccountsQuery = graphql(`
  query SearchClientAccounts($search: String!) {
    billing {
      clientAccounts(search: $search, page: 1, perPage: 10) {
        value: id
        label: currency
      }
    }
  }
`);
