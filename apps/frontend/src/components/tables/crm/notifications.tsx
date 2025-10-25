import { ColumnDef } from "@tanstack/react-table";
import { TableNotificationQuery } from "@packages/graphql/client/generated/graphql";

// Extract the notification type from the TableNotificationQuery
type Notification = NonNullable<TableNotificationQuery["crm"]>["notifications"][number];

export const columns: ColumnDef<Notification>[] = [
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "isRead",
    header: "Read",
    cell: ({ row }) => {
      const isRead = row.getValue("isRead") as boolean | null;
      return isRead ? "Yes" : "No";
    },
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "link",
    header: "Link",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];