import { graphql } from "../generated/gql";

export const CreateAttachmentMutation = graphql(`
  mutation CreateAttachment($attachment: CreateAttachmentInput!) {
    crm {
      createAttachment(value: $attachment) {
        id
      }
    }
  }
`);

export const RemoveAttachmentMutation = graphql(`
  mutation RemoveAttachment($id: ID!) {
    crm {
      removeAttachment(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableAttachmentQuery = graphql(`
  query TableAttachment(
    $page: Int
    $perPage: Int
    $from: Date
    $to: Date
    $search: String
  ) {
    crm {
      attachments(
        page: $page
        perPage: $perPage
        from: $from
        to: $to
        search: $search
      ) {
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

export const FindAttachmentQuery = graphql(`
  query FindAttachment($id: ID!) {
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

export const SearchAttachmentsQuery = graphql(`
  query SearchAttachments($search: String!) {
    crm {
      attachments(page: 1, perPage: 10, search: $search) {
        value: id
        label: fileName
      }
    }
  }
`);

export const AnalyticsAttachmentsQuery = graphql(`
  query AnalyticsAttachments($from: Date, $to: Date) {
    crm {
      attachments(from: $from, to: $to) {
        id
        mimeType
        recordType
        createdAt
      }
    }
  }
`);
