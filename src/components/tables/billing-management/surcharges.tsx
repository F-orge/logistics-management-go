import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate, truncateText } from "@/components/utils";
import { BillingManagementSurchargesResponse } from "@/lib/pb.types";

type SurchargeResponse = BillingManagementSurchargesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<SurchargeResponse>[] = [
  {
    label: "Edit Surcharge",
    icon: <EditIcon />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "update",
          id: row.original.id,
        }),
      }),
    divider: true,
  },
  {
    label: "Delete Surcharge",
    variant: "destructive",
    icon: <Trash />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "delete",
          id: row.original.id,
        }),
      }),
  },
];

export const columns: ColumnDef<SurchargeResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Surcharge Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "calculationMethod",
    header: "Calculation Method",
    cell: ({ row }) => {
      const method = row.getValue("calculationMethod") as string | undefined;
      return method ? method.replace(/-/g, " ") : "-";
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number | undefined;
      const method = row.original.calculationMethod as string | undefined;
      if (!amount) return "-";
      return (
        <span>
          {formatCurrency(amount)}
          {method === "percentage" ? "%" : ""}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => truncateText(row.getValue("description") as string, 50),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean | undefined;
      return isActive ? (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          Active
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
    cell: ({ row }) => formatDate(row.getValue("validFrom") as string),
  },
  {
    accessorKey: "validTo",
    header: "Valid To",
    cell: ({ row }) => {
      const date = row.getValue("validTo") as string | undefined;
      if (!date) return "-";
      const expDate = new Date(date);
      const today = new Date();
      const isExpired = expDate < today;
      return (
        <span className={isExpired ? "text-red-600 font-semibold" : ""}>
          {formatDate(date)}
        </span>
      );
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
