import { graphql } from "@/lib/graphql/client";

export const getTag = graphql(`
  query GetTag($id: UUID!) {
    crm {
      tag(id: $id) {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`);

export const getTags = graphql(`
  query GetTags($limit: Int!, $page: Int!) {
    crm {
      tags(limit: $limit, page: $page) {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`);
