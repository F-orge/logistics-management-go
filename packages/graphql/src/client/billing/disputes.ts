import { graphql } from "../generated/gql";

export const CreateDisputeMutation = graphql(`
  mutation CreateDispute($dispute: CreateDisputeInput!) {
    billing {
      createDispute(value: $dispute) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateDisputeMutation = graphql(`
  mutation UpdateDispute($id: ID!, $dispute: UpdateDisputeInput!) {
    billing {
      updateDispute(id: $id, value: $dispute) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
      }
    }
  }
`);

// export const RemoveDisputeMutation = graphql(`
//   mutation RemoveDispute($id: ID!) {
//     billing {
//       removeDispute(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);

export const TableDisputeQuery = graphql(`
  query TableDispute(
    $page: Int
    $perPage: Int
    $search: String
    $status: DisputeStatus
  ) {
    billing {
      disputes(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        client {
          annualRevenue
          city
          id
          industry
          name
          website
          phoneNumber
        }
        disputedAmount
        id
        reason
        resolutionNotes
        resolvedAt
        status
        submittedAt
        updatedAt
        resolvedByUser {
          email
          id
          image
          name
        }
        lineItem {
          discountAmount
          discountRate
          description
          id
          lineTotal
          quantity
          sourceRecordId
          sourceRecordType
          taxAmount
          taxRate
          totalPrice
          unitPrice
          updatedAt
          invoice {
            amountPaid
            currency
            discountAmount
            dueDate
            id
            invoiceNumber
            issueDate
            notes
            paidAt
            paymentTerms
            sentAt
            status
            subtotal
            taxAmount
            totalAmount
            updatedAt
          }
        }
      }
    }
  }
`);

export const SearchDisputesQuery = graphql(`
  query SearchDisputes($search: String!) {
    billing {
      disputes(search: $search, page: 1, perPage: 10) {
        value: id
        label: reason
      }
    }
  }
`);

export const AnalyticsDisputesQuery = graphql(`
  query AnalyticsDisputes($from: Date, $to: Date) {
    billing {
      disputes(from: $from, to: $to) {
        disputedAmount
        status
      }
    }
  }
`);
