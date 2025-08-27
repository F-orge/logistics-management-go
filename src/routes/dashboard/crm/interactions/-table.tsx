import { getRouteApi } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableColumnHeader } from "@/components/ui/kibo-ui/table";
import type {
  CrmContactsRecord,
  CrmInteractionsResponse,
  CrmOpportunitiesRecord,
} from "@/pocketbase/types";

export const columns: ColumnDef<
  CrmInteractionsResponse<
    { contact: CrmContactsRecord; opportunity: CrmOpportunitiesRecord }
  >
>[] = [
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const route = getRouteApi("/dashboard/crm/interactions/");

      const navigate = route.useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      editInteraction: true,
                      id: row.original.id,
                    }),
                  })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteInteraction: true,
                      id: row.original.id,
                    }),
                  })}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <span className="capitalize">
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Subject" />
    ),
  },
  {
    accessorKey: "interaction_date",
    header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("interaction_date"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      const contact = row.original.expand?.contact;
      if (!contact) return <div>-</div>;
      return <div>{contact.first_name} {contact.last_name}</div>;
    },
  },
  {
    accessorKey: "opportunity",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Opportunity" />
    ),
    cell: ({ row }) => {
      const opportunity = row.original.expand?.opportunity;
      if (!opportunity) return <div>-</div>;
      return <div>{opportunity.name}</div>;
    },
  },
];
