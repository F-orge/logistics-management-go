import { graphql } from "@/lib/graphql/client";

export const uploadAttachment = graphql(`
  mutation UploadAttachment($file: Upload!, $recordId: UUID!, $recordType: RecordType!) {
    crm {
      uploadAttachment(file: $file, recordId: $recordId, recordType: $recordType) {
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

export const removeAttachment = graphql(`
  mutation RemoveAttachment($id: UUID!) {
    crm {
      removeAttachment(id: $id)
    }
  }
`);
