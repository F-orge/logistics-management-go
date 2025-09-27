import { graphql } from "@/lib/graphql/client";

export const createTag = graphql(`
  mutation CreateTag($payload: CreateTagInput!) {
    crm {
      createTag(payload: $payload) {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`);

export const updateTagName = graphql(`
  mutation UpdateTagName($id: UUID!, $name: String!) {
    crm {
      updateTagName(id: $id, name: $name) {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`);

export const removeTag = graphql(`
  mutation RemoveTag($id: UUID!) {
    crm {
      removeTag(id: $id)
    }
  }
`);
