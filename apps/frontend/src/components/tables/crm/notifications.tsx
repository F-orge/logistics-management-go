import { ColumnDef } from "@tanstack/react-table";
import { TableNotificationQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the notification type from the TableNotificationQuery
type Notification = NonNullable<TableNotificationQuery["crm"]>["notifications"][number];

export const columns: ColumnDef<Notification>[] = [
  {
    header: "Notification Details",
    columns: [
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
        accessorKey: "link",
        header: "Link",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | null;
          if (!createdAt) return "-";
          return format(new Date(Number(createdAt)), "PPP");
        },
      },
    ],
  },
  {
    id: "user",
    header: "User Information",
    columns: [
      {
        accessorKey: "user.name",
        header: "Name",
        accessorFn: (row) => row.user?.name,
      },
      {
        accessorKey: "user.email",
        header: "Email",
        accessorFn: (row) => row.user?.email,
      },
    ],
  },
];