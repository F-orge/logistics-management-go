import { graphql } from "@/lib/graphql/client";

// ============================================================================
// PAYMENT MUTATIONS
// ============================================================================

/**
 * Creates a new billing payment.
 * @param payload The input data for creating the payment.
 */
export const createPayment = graphql(`
  mutation CreatePayment($payload: CreatePaymentInput!) {
    billing {
      createPayment(payload: $payload) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the invoice ID of a billing payment.
 * @param id The UUID of the payment to update.
 * @param invoiceId The new invoice ID.
 */
export const updatePaymentInvoiceId = graphql(`
  mutation UpdatePaymentInvoiceId($id: UUID!, $invoiceId: UUID!) {
    billing {
      updatePaymentInvoiceId(id: $id, invoiceId: $invoiceId) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the amount of a billing payment.
 * @param id The UUID of the payment to update.
 * @param amount The new amount.
 */
export const updatePaymentAmount = graphql(`
  mutation UpdatePaymentAmount($id: UUID!, $amount: Float!) {
    billing {
      updatePaymentAmount(id: $id, amount: $amount) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the payment method of a billing payment.
 * @param id The UUID of the payment to update.
 * @param paymentMethod The new payment method.
 */
export const updatePaymentPaymentMethod = graphql(`
  mutation UpdatePaymentPaymentMethod($id: UUID!, $paymentMethod: PaymentMethodEnum!) {
    billing {
      updatePaymentPaymentMethod(id: $id, paymentMethod: $paymentMethod) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the transaction ID of a billing payment.
 * @param id The UUID of the payment to update.
 * @param transactionId The new transaction ID.
 */
export const updatePaymentTransactionId = graphql(`
  mutation UpdatePaymentTransactionId($id: UUID!, $transactionId: String) {
    billing {
      updatePaymentTransactionId(id: $id, transactionId: $transactionId) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the gateway reference of a billing payment.
 * @param id The UUID of the payment to update.
 * @param gatewayReference The new gateway reference.
 */
export const updatePaymentGatewayReference = graphql(`
  mutation UpdatePaymentGatewayReference($id: UUID!, $gatewayReference: String) {
    billing {
      updatePaymentGatewayReference(id: $id, gatewayReference: $gatewayReference) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the status of a billing payment.
 * @param id The UUID of the payment to update.
 * @param status The new status.
 */
export const updatePaymentStatus = graphql(`
  mutation UpdatePaymentStatus($id: UUID!, $status: PaymentStatusEnum!) {
    billing {
      updatePaymentStatus(id: $id, status: $status) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the payment date of a billing payment.
 * @param id The UUID of the payment to update.
 * @param paymentDate The new payment date.
 */
export const updatePaymentPaymentDate = graphql(`
  mutation UpdatePaymentPaymentDate($id: UUID!, $paymentDate: DateTime) {
    billing {
      updatePaymentPaymentDate(id: $id, paymentDate: $paymentDate) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the processed at timestamp of a billing payment.
 * @param id The UUID of the payment to update.
 * @param processedAt The new processed at timestamp.
 */
export const updatePaymentProcessedAt = graphql(`
  mutation UpdatePaymentProcessedAt($id: UUID!, $processedAt: DateTime) {
    billing {
      updatePaymentProcessedAt(id: $id, processedAt: $processedAt) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the currency of a billing payment.
 * @param id The UUID of the payment to update.
 * @param currency The new currency.
 */
export const updatePaymentCurrency = graphql(`
  mutation UpdatePaymentCurrency($id: UUID!, $currency: String) {
    billing {
      updatePaymentCurrency(id: $id, currency: $currency) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the exchange rate of a billing payment.
 * @param id The UUID of the payment to update.
 * @param exchangeRate The new exchange rate.
 */
export const updatePaymentExchangeRate = graphql(`
  mutation UpdatePaymentExchangeRate($id: UUID!, $exchangeRate: Float) {
    billing {
      updatePaymentExchangeRate(id: $id, exchangeRate: $exchangeRate) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the fees of a billing payment.
 * @param id The UUID of the payment to update.
 * @param fees The new fees.
 */
export const updatePaymentFees = graphql(`
  mutation UpdatePaymentFees($id: UUID!, $fees: Float) {
    billing {
      updatePaymentFees(id: $id, fees: $fees) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the notes of a billing payment.
 * @param id The UUID of the payment to update.
 * @param notes The new notes.
 */
export const updatePaymentNotes = graphql(`
  mutation UpdatePaymentNotes($id: UUID!, $notes: String) {
    billing {
      updatePaymentNotes(id: $id, notes: $notes) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the processed by user ID of a billing payment.
 * @param id The UUID of the payment to update.
 * @param processedByUserId The new processed by user ID.
 */
export const updatePaymentProcessedByUserId = graphql(`
  mutation UpdatePaymentProcessedByUserId($id: UUID!, $processedByUserId: UUID) {
    billing {
      updatePaymentProcessedByUserId(id: $id, processedByUserId: $processedByUserId) {
        id
        amount
        paymentMethod
        transactionId
        gatewayReference
        status
        paymentDate
        processedAt
        currency
        exchangeRate
        fees
        netAmount
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a billing payment by its ID.
 * @param id The UUID of the payment to remove.
 */
export const removePayment = graphql(`
  mutation RemovePayment($id: UUID!) {
    billing {
      removePayment(id: $id)
    }
  }
`);
