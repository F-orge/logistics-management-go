import { graphql } from "@/lib/graphql/client";

export const getInvoice = graphql(`
  query GetInvoice($id: UUID!) {
    crm {
      invoice(id: $id) {
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

export const getInvoices = graphql(`
  query GetInvoices($limit: Int!, $page: Int!) {
    crm {
      invoices(limit: $limit, page: $page) {
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
