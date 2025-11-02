import { graphql } from "../generated/gql";

export const CreateDocumentMutation = graphql(`
  mutation CreateDocument($document: CreateDocumentInput!) {
    billing {
      createDocument(value: $document) {
        id
      }
    }
  }
`);

export const UpdateDocumentMutation = graphql(`
  mutation UpdateDocument($id: ID!, $document: UpdateDocumentInput!) {
    billing {
      updateDocument(id: $id, value: $document) {
        id
      }
    }
  }
`);

export const RemoveDocumentMutation = graphql(`
  mutation RemoveDocument($id: ID!) {
    billing {
      removeDocument(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableDocumentQuery = graphql(`
  query TableDocument(
    $page: Int
    $perPage: Int
    $from: Date
    $to: Date
  ) {
    billing {
      documents(page: $page, perPage: $perPage, from: $from, to: $to) {
        id
        recordId
        recordType
        documentType
        filePath
        fileName
        fileSize
        mimeType
        createdAt
        updatedAt
        uploadedByUser {
          id
          email
          name
          image
        }
      }
    }
  }
`);

export const FindDocumentQuery = graphql(`
  query FindDocument($id: ID!) {
    billing {
      document(id: $id) {
        id
        recordId
        recordType
        documentType
        filePath
        fileName
        fileSize
        mimeType
        createdAt
        updatedAt
        uploadedByUser {
          id
          email
          name
          image
        }
      }
    }
  }
`);

export const SearchDocumentsQuery = graphql(`
  query SearchDocuments($from: Date, $to: Date) {
    billing {
      documents(from: $from, to: $to, page: 1, perPage: 10) {
        value: id
        label: fileName
      }
    }
  }
`);

export const AnalyticsDocumentsQuery = graphql(`
  query AnalyticsDocuments($from: Date, $to: Date) {
    billing {
      documents(from: $from, to: $to) {
        id
        documentType
        fileSize
        createdAt
      }
    }
  }
`);
