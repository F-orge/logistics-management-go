import { graphql } from "../../generated/gql";

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
