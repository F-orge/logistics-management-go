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
import type { CrmCompaniesResponse } from "@/pocketbase/types";

export const columns: ColumnDef<CrmCompaniesResponse>[] = [
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const route = getRouteApi("/dashboard/crm/companies/");

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
                      editCompany: true,
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
                      deleteCompany: true,
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
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: "industry",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Industry" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Phone Number" />
    ),
  },
  {
    accessorKey: "website",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => {
      const website = row.getValue("website");
      if (!website) return <div>-</div>;
      return (
        <a
          href={website as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {website as string}
        </a>
      );
    },
  },
];
