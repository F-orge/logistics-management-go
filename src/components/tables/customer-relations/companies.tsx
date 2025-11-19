import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate, urlCell } from "@/components/utils";
import { CustomerRelationsCompaniesResponse } from "@/lib/pb.types";

type CompanyResponse = CustomerRelationsCompaniesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<CompanyResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Company ID copied to clipboard");
    },
  },
  {
    label: "Share Via QR Code",
    icon: <QrCode />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "share", id: row.original.id }),
      }),
    divider: true,
  },
  {
    label: "View Record",
    icon: <View />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "view", id: row.original.id }),
      }),
  },
  {
    label: "Edit Company",
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
    label: "Delete Company",
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

export const columns: ColumnDef<CompanyResponse>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "annualRevenue",
    header: "Annual Revenue",
    cell: ({ row }) =>
      formatCurrency(row.getValue("annualRevenue") as number | undefined),
  },
  {
    accessorKey: "street",
    header: "Street",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "postalCode",
    header: "Postal Code",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => urlCell(row.getValue("website") as string | undefined),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => formatDate(row.getValue("updated") as string),
  },
];
