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

export const SearchPaymentsQuery = graphql(`
  query SearchPayments($search: String!) {
    billing {
      payments(search: $search, page: 1, perPage: 10) {
        value: id
        label: transactionId
      }
    }
  }
`);

export const AnalyticsPaymentsQuery = graphql(`
  query AnalyticsPayments($from: Date, $to: Date) {
    billing {
      payments(from: $from, to: $to) {
        amount
        exchangeRate
        fees
        netAmount
        paymentMethod
        status
      }
    }
  }
`);
