import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
	Collections,
	TypedPocketBase,
	WarehouseManagementInventoryBatchesResponse,
	WarehouseManagementInventoryStockRecord,
	WarehouseManagementLocationsResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";
import {
	CreateInventoryStockSchema,
	UpdateInventoryStockSchema,
} from "@/pocketbase/schemas/warehouse-management/inventory-stock";

export type InventoryStockFormProps = {
	action?: "create" | "edit";
};

export const InventoryStockForm = withForm({
	defaultValues: {} as z.infer<ReturnType<typeof UpdateInventoryStockSchema>>,
	props: {} as InventoryStockFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* location - string (relation) */}
				<form.AppField name="location">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Location"
							description="Storage location"
						>
							<field.RelationField<WarehouseManagementLocationsResponse>
								collectionName={Collections.WarehouseManagementLocations}
								relationshipName="location"
								renderOption={(item) => `${item.name}`}
								disabled={props.action === "edit"}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* product - string (relation) */}
				<form.AppField name="product">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Product"
							description="Product"
						>
							<field.RelationField<WarehouseManagementProductsResponse>
								collectionName={Collections.WarehouseManagementProducts}
								relationshipName="product"
								renderOption={(item) => `${item.name}`}
								disabled={props.action === "edit"}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* batch - string (relation) */}
				<form.AppField name="batch">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Batch"
							description="Inventory batch"
						>
							<field.RelationField<WarehouseManagementInventoryBatchesResponse>
								collectionName={Collections.WarehouseManagementInventoryBatches}
								relationshipName="batch"
								renderOption={(item) => `${item.batchNumber}`}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* quantity - number */}
				<form.AppField name="quantity">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Quantity"
							description="Quantity on hand"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* reservedQuantity - number */}
				<form.AppField name="reservedQuantity">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Reserved Qty"
							description="Reserved quantity"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* status - enum */}
				<form.AppField name="status">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Status"
							description="Stock status"
						>
							<field.SelectField
								options={[
									{ value: "available", label: "Available" },
									{ value: "allocated", label: "Allocated" },
									{ value: "damaged", label: "Damaged" },
									{ value: "quarantine", label: "Quarantine" },
									{ value: "hold", label: "Hold" },
									{ value: "shipped", label: "Shipped" },
									{ value: "expired", label: "Expired" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* lastCountedAt - date */}
				<form.AppField name="lastCountedAt">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Last Counted"
							description="Last inventory count date"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* lastMovementAt - date */}
				<form.AppField name="lastMovementAt">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Last Movement"
							description="Last stock movement date"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
			</form.FieldSet>
		);
	},
});

export const CreateInventoryStockFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			location: undefined,
			product: undefined,
			batch: undefined,
			quantity: 0,
			reservedQuantity: 0,
			status: undefined,
			lastCountedAt: undefined,
			lastMovementAt: undefined,
		} as Partial<z.infer<ReturnType<typeof CreateInventoryStockSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInventoryStock)
					.create(value);

				toast.success("Inventory stock created successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });
					toast.error(
						`Failed to create stock: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateInventoryStockFormOption = (
	pocketbase: TypedPocketBase,
	record?: WarehouseManagementInventoryStockRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateInventoryStockSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInventoryStock)
					.update(record?.id!, value);

				toast.success("Inventory stock updated successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });
					toast.error(
						`Failed to update stock: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
