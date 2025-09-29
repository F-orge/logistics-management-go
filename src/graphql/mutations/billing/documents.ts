import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DOCUMENT MUTATIONS
// ============================================================================

/**
 * Creates a new billing document.
 * @param payload The input data for creating the document.
 */
export const createDocument = graphql(`
  mutation CreateDocument($payload: CreateDocumentInput!) {
    billing {
      createDocument(payload: $payload) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the record ID of a billing document.
 * @param id The UUID of the document to update.
 * @param recordId The new record ID.
 */
export const updateDocumentRecordId = graphql(`
  mutation UpdateDocumentRecordId($id: UUID!, $recordId: UUID!) {
    billing {
      updateDocumentRecordId(id: $id, recordId: $recordId) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the record type of a billing document.
 * @param id The UUID of the document to update.
 * @param recordType The new record type.
 */
export const updateDocumentRecordType = graphql(`
  mutation UpdateDocumentRecordType($id: UUID!, $recordType: String!) {
    billing {
      updateDocumentRecordType(id: $id, recordType: $recordType) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the document type of a billing document.
 * @param id The UUID of the document to update.
 * @param documentType The new document type.
 */
export const updateDocumentDocumentType = graphql(`
  mutation UpdateDocumentDocumentType($id: UUID!, $documentType: DocumentTypeEnum!) {
    billing {
      updateDocumentDocumentType(id: $id, documentType: $documentType) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the file path of a billing document.
 * @param id The UUID of the document to update.
 * @param filePath The new file path.
 */
export const updateDocumentFilePath = graphql(`
  mutation UpdateDocumentFilePath($id: UUID!, $filePath: String!) {
    billing {
      updateDocumentFilePath(id: $id, filePath: $filePath) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the file name of a billing document.
 * @param id The UUID of the document to update.
 * @param fileName The new file name.
 */
export const updateDocumentFileName = graphql(`
  mutation UpdateDocumentFileName($id: UUID!, $fileName: String!) {
    billing {
      updateDocumentFileName(id: $id, fileName: $fileName) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the file size of a billing document.
 * @param id The UUID of the document to update.
 * @param fileSize The new file size.
 */
export const updateDocumentFileSize = graphql(`
  mutation UpdateDocumentFileSize($id: UUID!, $fileSize: Int) {
    billing {
      updateDocumentFileSize(id: $id, fileSize: $fileSize) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the MIME type of a billing document.
 * @param id The UUID of the document to update.
 * @param mimeType The new MIME type.
 */
export const updateDocumentMimeType = graphql(`
  mutation UpdateDocumentMimeType($id: UUID!, $mimeType: String) {
    billing {
      updateDocumentMimeType(id: $id, mimeType: $mimeType) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the uploaded by user ID of a billing document.
 * @param id The UUID of the document to update.
 * @param uploadedByUserId The new uploaded by user ID.
 */
export const updateDocumentUploadedByUserId = graphql(`
  mutation UpdateDocumentUploadedByUserId($id: UUID!, $uploadedByUserId: UUID) {
    billing {
      updateDocumentUploadedByUserId(id: $id, uploadedByUserId: $uploadedByUserId) {
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
        uploadedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a billing document by its ID.
 * @param id The UUID of the document to remove.
 */
export const removeDocument = graphql(`
  mutation RemoveDocument($id: UUID!) {
    billing {
      removeDocument(id: $id)
    }
  }
`);
