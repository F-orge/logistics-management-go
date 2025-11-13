import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  capitalize,
  expenseStatusColors,
  formatDate,
  formatDynamicCurrency,
  statusBadgeCell,
} from "@/components/utils";
import { TransportManagementExpensesResponse } from "@/lib/pb.types";

type ExpenseResponse = TransportManagementExpensesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ExpenseResponse>[] = [
  {
    label: "Edit Expense",
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
    label: "Delete Expense",
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

export const columns: ColumnDef<ExpenseResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "driver",
    header: "Driver ID",
  },
  {
    accessorKey: "trip",
    header: "Trip ID",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => capitalize(row.getValue("type") as string),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) =>
      formatDynamicCurrency(
        row.getValue("amount") as number,
        row.original.currency as string
      ),
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "fuelQuantity",
    header: "Fuel (L)",
  },
  {
    accessorKey: "odometerReading",
    header: "Odometer",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, expenseStatusColors),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
