import { graphql } from "../generated/gql";

export const CreatePaymentMutation = graphql(`
  mutation CreatePayment($payment: CreatePaymentInput!) {
    billing {
      createPayment(value: $payment) {
        id
      }
    }
  }
`);

export const UpdatePaymentMutation = graphql(`
  mutation UpdatePayment($id: ID!, $payment: UpdatePaymentInput!) {
    billing {
      updatePayment(id: $id, value: $payment) {
        id
      }
    }
  }
`);

export const RemovePaymentMutation = graphql(`
  mutation RemovePayment($id: ID!) {
    billing {
      removePayment(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TablePaymentQuery = graphql(`
  query TablePayment(
    $page: Int
    $paymentMethod: PaymentMethod
    $perPage: Int
    $search: String
    $status: PaymentStatus
  ) {
    billing {
      payments(
        page: $page
        paymentMethod: $paymentMethod
        perPage: $perPage
        search: $search
        status: $status
      ) {
        amount
        createdAt
        currency
        exchangeRate
        fees
        gatewayReference
        id
        invoice {
          invoiceNumber
          id
          issueDate
          paidAt
          paymentTerms
          sentAt
          status
          discountAmount
          amountPaid
          amountOutstanding
        }
        processedByUser {
          email
          id
          image
          name
        }
      }
    }
  }
`);
