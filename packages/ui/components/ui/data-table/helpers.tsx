import type { ColumnDef } from "@tanstack/react-table";
import type { ZodObject, ZodType, z } from "zod";
import { DataTableRegistry, type TableColumnRegistryConfig } from "./registry";

export const StringCell = ({
  value,
  config,
}: {
  value: string;
  config?: TableColumnRegistryConfig<string>;
}) => {
  return <>type - string {value}</>;
};

export const DateCell = ({ value }: { value: Date }) => {
  return <>type - date {value.toDateString()}</>;
};

export const NumberCell = ({ value }: { value: number }) => {
  return <>type - number {value.toString()}</>;
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
      cell: ({ getValue }) => {
        const cellType = registryData?.type || schemaType.def.type;

        switch (cellType) {
          case "string":
            return <StringCell value={getValue() as string} />;
          case "date":
            return <DateCell value={getValue() as Date} />;
          case "number":
            return <NumberCell value={getValue() as number} />;
          default:
            return <StringCell value={JSON.stringify(getValue()) as string} />;
        }
      },
    };

    columns.push(column);
  }

  return columns;
}
