import { graphql } from "@/lib/graphql/client";

export const getInvoice = graphql(`
  query GetCrmInvoice($id: UUID!) {
    crm {
      invoice(id: $id) {
        id
        status
        total
        issueDate
        dueDate
        sentAt
        paidAt
        paymentMethod
        createdAt
        updatedAt
        opportunity {
          id
          name
        }
        items(limit: 10, page: 1) {
          id
          quantity
          price
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
  query GetCrmInvoices($limit: Int!, $page: Int!) {
    crm {
      invoices(limit: $limit, page: $page) {
        id
        status
        total
        issueDate
        dueDate
        sentAt
        paidAt
        paymentMethod
        createdAt
        updatedAt
        opportunity {
          id
          name
        }
      }
    }
  }
`);
