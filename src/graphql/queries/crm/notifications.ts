import { graphql } from "@/lib/graphql/client";

export const getNotification = graphql(`
  query GetNotification($id: UUID!) {
    crm {
      notification(id: $id) {
        id
        message
        isRead
        link
        createdAt
        updatedAt
        user {
          id
          name
        }
      }
    }
  }
`);

export const getNotifications = graphql(`
  query GetNotifications($limit: Int!, $page: Int!) {
    crm {
      notifications(limit: $limit, page: $page) {
        id
        message
        isRead
        link
        createdAt
        updatedAt
        user {
          id
          name
        }
      }
    }
  }
`);
