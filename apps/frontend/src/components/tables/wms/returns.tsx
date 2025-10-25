import { ColumnDef } from "@tanstack/react-table";
import { TableReturnQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the return type from the TableReturnQuery
type Return = NonNullable<TableReturnQuery["wms"]>["returns"][number];

export const columns: ColumnDef<Return>[] = [
  {
    header: "Return Details",
    columns: [
      {
        accessorKey: "returnNumber",
        header: "Return Number",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "reason",
        header: "Reason",
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
    id: "client",
    header: "Client Information",
    columns: [
      {
        accessorKey: "client.name",
        header: "Name",
        accessorFn: (row) => row.client?.name,
      },
      {
        accessorKey: "client.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.client?.phoneNumber,
      },
      {
        accessorKey: "client.industry",
        header: "Industry",
        accessorFn: (row) => row.client?.industry,
      },
    ],
  },
  {
    id: "salesOrder",
    header: "Sales Order Information",
    columns: [
      {
        accessorKey: "salesOrder.orderNumber",
        header: "Order Number",
        accessorFn: (row) => row.salesOrder?.orderNumber,
      },
      {
        accessorKey: "salesOrder.status",
        header: "Status",
        accessorFn: (row) => row.salesOrder?.status,
      },
    ],
  },
];
