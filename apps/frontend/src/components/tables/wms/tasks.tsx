import { ColumnDef } from "@tanstack/react-table";
import { TableTaskQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the task type from the TableTaskQuery
type Task = NonNullable<TableTaskQuery["wms"]>["tasks"][number];

export const columns: ColumnDef<Task>[] = [
  {
    header: "Task Details",
    columns: [
      {
        accessorKey: "taskNumber",
        header: "Task Number",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "priority",
        header: "Priority",
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => {
          const startTime = row.getValue("startTime") as string | null;
          if (!startTime) return "-";
          return format(new Date(Number(startTime)), "Pp");
        },
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => {
          const endTime = row.getValue("endTime") as string | null;
          if (!endTime) return "-";
          return format(new Date(Number(endTime)), "Pp");
        },
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
  {
    id: "warehouse",
    header: "Warehouse Information",
    columns: [
      {
        accessorKey: "warehouse.name",
        header: "Name",
        accessorFn: (row) => row.warehouse?.name,
      },
      {
        accessorKey: "warehouse.city",
        header: "City",
        accessorFn: (row) => row.warehouse?.city,
      },
    ],
  },
];
