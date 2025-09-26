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

export const attachments = graphql(`
  query CrmAttachments($page:Int!,$limit:Int!) {
    crm {
      attachments(page: $page,limit: $limit) {
        fileName
        mimeType
        recordId
        recordType
        id
      }
    }
  }
`);

export const campaigns = graphql(`
  query CrmCampaigns($page:Int!,$limit:Int!) {
    crm {
      campaigns(page: $page,limit: $limit) {
        id
        name
        budget
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  }
`);

export const cases = graphql(`
  query CrmCases($page:Int!,$limit:Int!) {
    crm {
      cases(page: $page,limit: $limit) {
        id
        caseNumber
        status
        priority
        owner {
          name
          email
          image
        }
        contact {
          email
          jobTitle
          company {
            name
            industry
            website
          }
        }
      }
    }
  }
`);
