import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { withFieldGroup } from "@/components/ui/forms";
import {
	Collections,
	TypedPocketBase,
	WarehouseManagementProductsResponse,
	WarehouseManagementReturnItemsRecord,
	WarehouseManagementReturnsResponse,
} from "@/lib/pb.types";
import {
	CreateReturnItemsSchema,
	UpdateReturnItemsSchema,
} from "@/pocketbase/schemas/warehouse-management/return-items";

export type ReturnItemsFormProps = {
	action?: "create" | "edit";
	onRemove?: () => void;
};

export const ReturnItemsForm = withFieldGroup({
	defaultValues: {} as z.infer<ReturnType<typeof UpdateReturnItemsSchema>>,
	props: {} as ReturnItemsFormProps,
	render: ({ group, ...props }) => {
		return (
			<group.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* return - string (relation) */}
				<group.AppField name="return">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Return"
							description="Parent return"
						>
							<field.RelationField<WarehouseManagementReturnsResponse>
								collectionName={Collections.WarehouseManagementReturns}
								relationshipName="return"
								renderOption={(item) =>
									(item.returnNumber || item.id) as string
								}
							/>
						</field.Field>
					)}
				</group.AppField>
				{/* product - string (relation) */}
				<group.AppField name="product">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Product"
							description="Returned product"
						>
							<field.RelationField<WarehouseManagementProductsResponse>
								collectionName={Collections.WarehouseManagementProducts}
								relationshipName="product"
								renderOption={(item) => item.name as string}
							/>
						</field.Field>
					)}
				</group.AppField>
				{/* quantityExpected - number */}
				<group.AppField name="quantityExpected">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Expected Qty"
							description="Expected return quantity"
						>
							<field.NumberField />
						</field.Field>
					)}
				</group.AppField>
				{/* quantityReceived - number */}
				<group.AppField name="quantityReceived">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Received Qty"
							description="Received return quantity"
						>
							<field.NumberField />
						</field.Field>
					)}
				</group.AppField>
				{/* condition - enum */}
				<group.AppField name="condition">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Condition"
							description="Item condition"
						>
							<field.SelectField
								options={[
									{ value: "sellable", label: "Sellable" },
									{ value: "damaged", label: "Damaged" },
									{ value: "defective", label: "Defective" },
									{ value: "expired", label: "Expired" },
									{ value: "unsellable", label: "Unsellable" },
								]}
							/>
						</field.Field>
					)}
				</group.AppField>
				{props.onRemove && (
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onClick={props.onRemove}
						className="col-span-full"
					>
						Remove Item
					</Button>
				)}
			</group.FieldSet>
		);
	},
});

export const CreateReturnItemsFormOptions = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			return: "",
			product: "",
			quantityExpected: 0,
			quantityReceived: 0,
			condition: "",
		} as z.infer<typeof CreateReturnItemsSchema>,
		onSubmit: async ({ value }) => {
			try {
				const created = await pocketbase
					.collection(Collections.WarehouseManagementReturnItems)
					.create(value as any);
				toast.success(`Return item created successfully`);
				return created;
			} catch (error) {
				if (error instanceof ClientResponseError) {
					toast.error(error.message);
					throw error;
				}
				throw error;
			}
		},
	});

export const UpdateReturnItemsFormOptions = (
	pocketbase: TypedPocketBase,
	record?: WarehouseManagementReturnItemsRecord,
) =>
	formOptions({
		defaultValues: {
			return: record?.return ?? "",
			product: record?.product ?? "",
			quantityExpected: record?.quantityExpected ?? 0,
			quantityReceived: record?.quantityReceived ?? 0,
			condition: record?.condition ?? "",
		} as z.infer<typeof UpdateReturnItemsSchema>,
		onSubmit: async ({ value }) => {
			if (!record?.id) {
				throw new Error("Record ID is required for updates");
			}
			try {
				const updated = await pocketbase
					.collection(Collections.WarehouseManagementReturnItems)
					.update(record.id, value as any);
				toast.success(`Return item updated successfully`);
				return updated;
			} catch (error) {
				if (error instanceof ClientResponseError) {
					toast.error(error.message);
					throw error;
				}
				throw error;
			}
		},
	});
