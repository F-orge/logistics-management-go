import { graphql } from "@/lib/graphql/client";

export const createInvoice = graphql(`
  mutation CreateInvoice($payload: CreateInvoiceInput!) {
    crm {
      createInvoice(payload: $payload) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoiceOpportunityId = graphql(`
  mutation UpdateInvoiceOpportunityId($id: UUID!, $opportunityId: UUID) {
    crm {
      updateInvoiceOpportunityId(id: $id, opportunityId: $opportunityId) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoiceStatus = graphql(`
  mutation UpdateInvoiceStatus($id: UUID!, $status: InvoiceStatus) {
    crm {
      updateInvoiceStatus(id: $id, status: $status) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoiceTotal = graphql(`
  mutation UpdateInvoiceTotal($id: UUID!, $total: Decimal) {
    crm {
      updateInvoiceTotal(id: $id, total: $total) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoiceIssueDate = graphql(`
  mutation UpdateInvoiceIssueDate($id: UUID!, $issueDate: NaiveDate) {
    crm {
      updateInvoiceIssueDate(id: $id, issueDate: $issueDate) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoiceDueDate = graphql(`
  mutation UpdateInvoiceDueDate($id: UUID!, $dueDate: NaiveDate) {
    crm {
      updateInvoiceDueDate(id: $id, dueDate: $dueDate) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoiceSentAt = graphql(`
  mutation UpdateInvoiceSentAt($id: UUID!, $sentAt: DateTime) {
    crm {
      updateInvoiceSentAt(id: $id, sentAt: $sentAt) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoicePaidAt = graphql(`
  mutation UpdateInvoicePaidAt($id: UUID!, $paidAt: DateTime) {
    crm {
      updateInvoicePaidAt(id: $id, paidAt: $paidAt) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const updateInvoicePaymentMethod = graphql(`
  mutation UpdateInvoicePaymentMethod($id: UUID!, $paymentMethod: PaymentMethod) {
    crm {
      updateInvoicePaymentMethod(id: $id, paymentMethod: $paymentMethod) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const addInvoiceItem = graphql(`
  mutation AddInvoiceItem($id: UUID!, $payload: CreateInvoiceItemInput!) {
    crm {
      addInvoiceItem(id: $id, payload: $payload) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const removeInvoiceItem = graphql(`
  mutation RemoveInvoiceItem($itemId: UUID!) {
    crm {
      removeInvoiceItem(itemId: $itemId) {
        id
        dueDate
        issueDate
        paidAt
        sentAt
        status
        total
        paymentMethod
        createdAt
        updatedAt
        opportunityId
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          price
          quantity
          product {
            id
            name
          }
        }
      }
    }
  }
`);

export const removeInvoice = graphql(`
  mutation RemoveInvoice($id: UUID!) {
    crm {
      removeInvoice(id: $id)
    }
  }
`);
