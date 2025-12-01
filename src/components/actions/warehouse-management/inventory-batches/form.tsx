import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
	Collections,
	TypedPocketBase,
	WarehouseManagementInventoryBatchesRecord,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";
import {
	CreateInventoryBatchesSchema,
	UpdateInventoryBatchesSchema,
} from "@/pocketbase/schemas/warehouse-management/inventory-batches";

export type InventoryBatchesFormProps = {
	action?: "create" | "edit";
};

export const InventoryBatchesForm = withForm({
	defaultValues: {} as z.infer<ReturnType<typeof UpdateInventoryBatchesSchema>>,
	props: {} as InventoryBatchesFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
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
				{/* batchNumber - string */}
				<form.AppField name="batchNumber">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Batch Number"
							description="Unique batch identifier"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* expirationDate - date */}
				<form.AppField name="expirationDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Expiration Date"
							description="Batch expiration date"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
			</form.FieldSet>
		);
	},
});

export const CreateInventoryBatchesFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			product: undefined,
			batchNumber: "",
			expirationDate: undefined,
		} as Partial<z.infer<ReturnType<typeof CreateInventoryBatchesSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInventoryBatches)
					.create(value);

				toast.success("Inventory batch created successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });
					toast.error(
						`Failed to create batch: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateInventoryBatchesFormOption = (
	pocketbase: TypedPocketBase,
	record?: WarehouseManagementInventoryBatchesRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateInventoryBatchesSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInventoryBatches)
					.update(record?.id!, value);

				toast.success("Inventory batch updated successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });
					toast.error(
						`Failed to update batch: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
