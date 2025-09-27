import { graphql } from "@/lib/graphql/client";

export const createNotification = graphql(`
  mutation CreateNotification($payload: CreateNotificationInput!) {
    crm {
      createNotification(payload: $payload) {
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

export const updateNotificationUserId = graphql(`
  mutation UpdateNotificationUserId($id: UUID!, $userId: UUID!) {
    crm {
      updateNotificationUserId(id: $id, userId: $userId) {
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

export const updateNotificationMessage = graphql(`
  mutation UpdateNotificationMessage($id: UUID!, $message: String!) {
    crm {
      updateNotificationMessage(id: $id, message: $message) {
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

export const updateNotificationIsRead = graphql(`
  mutation UpdateNotificationIsRead($id: UUID!, $isRead: Boolean) {
    crm {
      updateNotificationIsRead(id: $id, isRead: $isRead) {
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

export const updateNotificationLink = graphql(`
  mutation UpdateNotificationLink($id: UUID!, $link: String) {
    crm {
      updateNotificationLink(id: $id, link: $link) {
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

export const removeNotification = graphql(`
  mutation RemoveNotification($id: UUID!) {
    crm {
      removeNotification(id: $id)
    }
  }
`);
