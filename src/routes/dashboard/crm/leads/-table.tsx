import { TableColumnHeader } from "@/components/ui/kibo-ui/table";
import type { CrmLeadsResponse } from "@/pocketbase/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CrmLeadsResponse>[] = [
  {
    accessorKey: "company_name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "lead_score",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lead Score" />
    ),
  },
  {
    accessorKey: "lead_status",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lead Status" />
    ),
  },
  {
    accessorKey: "lead_source",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lead Source" />
    ),
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Phone Number" />
    ),
  },
];
