import { graphql } from "../generated/gql";

export const CreateAccountTransactionMutation = graphql(`
  mutation CreateAccountTransaction(
    $accountTransaction: CreateAccountTransactionInput!
  ) {
    billing {
      createAccountTransaction(value: $accountTransaction) {
        id
        type
        amount
        runningBalance
        sourceRecordId
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
      }
    }
  }
`);

// export const UpdateAccountTransactionMutation = graphql(`
//   mutation UpdateAccountTransaction(
//     $id: ID!
//     $accountTransaction: UpdateAccountTransactionInput!
//   ) {
//     billing {
//       updateAccountTransaction(id: $id, value: $accountTransaction) {
//         id
//       }
//     }
//   }
// `);

// export const RemoveAccountTransactionMutation = graphql(`
//   mutation RemoveAccountTransaction($id: ID!) {
//     billing {
//       removeAccountTransaction(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);

export const AccountTransactionsQuery = graphql(`
  query AccountTransactions(
    $page: Int
    $perPage: Int
    $search: String
    $type: TransactionType
  ) {
    billing {
      accountTransactions(
        page: $page
        perPage: $perPage
        search: $search
        type: $type
      ) {
        amount
        createdAt
        description
        id
        referenceNumber
        runningBalance
        sourceRecordId
        sourceRecordType
        transactionDate
        type
        processedByUser {
          name
          image
          email
          id
        }
        updatedAt
        clientAccount {
          availableCredit
          paymentTermsDays
          updatedAt
          walletBalance
          createdAt
          client {
            annualRevenue
            id
            industry
            name
            phoneNumber
          }
        }
      }
    }
  }
`);

export const SearchAccountTransactionsQuery = graphql(`
  query SearchAccountTransactions($search: String!) {
    billing {
      accountTransactions(search: $search, page: 1, perPage: 10) {
        value: id
        label: referenceNumber
      }
    }
  }
`);

export const AnalyticsAccountTransactionsQuery = graphql(`
  query AnalyticsAccountTransactions($from: Date, $to: Date) {
    billing {
      accountTransactions(from: $from, to: $to) {
        amount
        runningBalance
        type
      }
    }
  }
`);
