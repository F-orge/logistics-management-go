import { graphql } from "@/lib/graphql/client";

export const addInvoiceItem = graphql(`
  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {
    crm {
      addInvoiceItem(id: $id,payload: $payload) {
        total
        items(page: 0,limit: 30) {
          product {
            name
          }
        }
      }
    }
  }  
`);
