import { graphql } from "@/lib/graphql/client";

export const getAttachment = graphql(`
  query GetAttachment($id: UUID!) {
    crm {
      attachment(id: $id) {
        id
        fileName
        filePath
        mimeType
        recordId
        recordType
        createdAt
        updatedAt
      }
    }
  }
`);

export const getAttachments = graphql(`
  query GetAttachments($limit: Int!, $page: Int!) {
    crm {
      attachments(limit: $limit, page: $page) {
        id
        fileName
        filePath
        mimeType
        recordId
        recordType
        createdAt
        updatedAt
      }
    }
  }
`);