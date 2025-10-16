import type { ColumnDef } from "@tanstack/react-table";
import {
  ZodNullable,
  ZodOptional,
  type ZodObject,
  type ZodType,
  type z,
} from "zod";
import { DataTableRegistry, type TableColumnRegistryConfig } from "./registry";
import { DataTableColumnHeader } from "./column-header";
import StringCell from "./cells/string";
import NumberCell from "./cells/number";
import DateCell from "./cells/date";
import type { ZodTypeDef } from "zod/v3";
import ArrayCell from "./cells/array";
import ObjectCell from "./cells/object";

export const inferZodType = (
  type: ZodType | ZodNullable | ZodOptional
): ZodType => {
  if (type instanceof ZodNullable) {
    return inferZodType(type.unwrap() as any);
  }

  if (type instanceof ZodOptional) {
    return inferZodType(type.unwrap() as any);
  }

  return type;
};

export function generateColumn<T extends ZodObject>(
  schema?: T
): ColumnDef<z.infer<T>>[] {
  const columns: ColumnDef<z.infer<T>>[] = [];

  if (!schema) return [];

  for (const key in schema.shape) {
    const schemaType = schema.shape[key] as ZodType;

    const registryData = DataTableRegistry.get(schemaType);

    const column: ColumnDef<z.infer<T>> = {
      accessorKey: key,
      header: ({ column }) => {
        const title = registryData?.title || key;
        if (registryData?.sortable) {
          return (
            <DataTableColumnHeader column={column} title={title as string} />
          );
        } else {
          return key;
        }
      },
      cell: ({ getValue }) => {
        const cellType = registryData?.type
          ? registryData.type
          : inferZodType(schemaType).type;

        switch (cellType) {
          case "string":
            return <StringCell value={getValue() as string} />;
          case "date":
            return <DateCell value={getValue() as Date} format="PPP" />;
          case "number":
            return <NumberCell value={getValue() as number} />;
          case "array":
            return <ArrayCell values={getValue() as Record<string, any>[]} />;
          case "object":
            return <ObjectCell value={getValue() as Record<string, any>} />;
          default:
            return <StringCell value={JSON.stringify(getValue()) as string} />;
        }
      },
    };

    columns.push(column);
  }

  return columns;
}
