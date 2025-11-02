import type { ColumnDef } from "@tanstack/react-table";
import {
	ZodNullable,
	type ZodObject,
	ZodOptional,
	type ZodType,
	type z,
} from "zod";
import ArrayCell from "./cells/array";
import DateCell from "./cells/date";
import NumberCell from "./cells/number";
import ObjectCell from "./cells/object";
import StringCell from "./cells/string";
import { DataTableColumnHeader } from "./column-header";
import { DataTableRegistry } from "./registry";

export const inferZodType = (
	type: ZodType | ZodNullable | ZodOptional,
): ZodType => {
	if (type instanceof ZodNullable) {
		return inferZodType(type.unwrap() as unknown as ZodType);
	}

	if (type instanceof ZodOptional) {
		return inferZodType(type.unwrap() as unknown as ZodType);
	}

	return type;
};

export function generateColumn<T extends ZodObject>(
	schema?: T,
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
						return (
							<ArrayCell values={getValue() as Record<string, unknown>[]} />
						);
					case "object":
						return <ObjectCell value={getValue() as Record<string, unknown>} />;
					default:
						return <StringCell value={JSON.stringify(getValue()) as string} />;
				}
			},
		};

		columns.push(column);
	}

	return columns;
}
