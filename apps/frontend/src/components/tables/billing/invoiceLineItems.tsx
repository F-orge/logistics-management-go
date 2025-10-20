import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.invoiceLineItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "discountAmount",
    header: "Discount Amount",
  },
  {
    accessorKey: "discountRate",
    header: "Discount Rate",
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },
  {
    accessorKey: "lineTotal",
    header: "Line Total",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "sourceRecordId",
    header: "Source Record ID",
  },
  {
    accessorKey: "sourceRecordType",
    header: "Source Record Type",
  },
  {
    accessorKey: "taxAmount",
    header: "Tax Amount",
  },
  {
    accessorKey: "taxRate",
    header: "Tax Rate",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
