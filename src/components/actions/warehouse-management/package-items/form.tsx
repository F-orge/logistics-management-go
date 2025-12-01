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
	WarehouseManagementInventoryBatchesResponse,
	WarehouseManagementPackageItemsRecord,
	WarehouseManagementPackagesResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";
import {
	CreatePackageItemsSchema,
	UpdatePackageItemsSchema,
} from "@/pocketbase/schemas/warehouse-management/package-items";

export type PackageItemsFormProps = {
	action?: "create" | "edit";
	onRemove?: () => void;
};

export const PackageItemsForm = withFieldGroup({
	defaultValues: {} as z.infer<ReturnType<typeof UpdatePackageItemsSchema>>,
	props: {} as PackageItemsFormProps,
	render: ({ group, ...props }) => {
		return (
			<group.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* package - string (relation) */}
				<group.AppField name="package">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Package"
							description="Package"
						>
							<field.RelationField<WarehouseManagementPackagesResponse>
								collectionName={Collections.WarehouseManagementPackages}
								relationshipName="package"
								renderOption={(item) => `${item.packageNumber}`}
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
							description="Product"
						>
							<field.RelationField<WarehouseManagementProductsResponse>
								collectionName={Collections.WarehouseManagementProducts}
								relationshipName="product"
								renderOption={(item) => `${item.name}`}
							/>
						</field.Field>
					)}
				</group.AppField>
				{/* quantity - number */}
				<group.AppField name="quantity">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Quantity"
							description="Quantity in package"
						>
							<field.NumberField />
						</field.Field>
					)}
				</group.AppField>
				{/* batch - string (relation) */}
				<group.AppField name="batch">
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
				</group.AppField>
				{/* lotNumber - string */}
				<group.AppField name="lotNumber">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Lot Number"
							description="Lot/batch number"
						>
							<field.TextField />
						</field.Field>
					)}
				</group.AppField>
				{/* expiryDate - date */}
				<group.AppField name="expiryDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Expiry Date"
							description="Expiration date"
						>
							<field.DateTimeField />
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

export const CreatePackageItemsFormOptions = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			package: "",
			product: "",
			quantity: 0,
			batch: "",
			lotNumber: "",
			expiryDate: "",
		} as z.infer<typeof CreatePackageItemsSchema>,
		onSubmit: async ({ value }) => {
			try {
				const created = await pocketbase
					.collection(Collections.WarehouseManagementPackageItems)
					.create(value as any);
				toast.success(`Package item created successfully`);
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

export const UpdatePackageItemsFormOptions = (
	pocketbase: TypedPocketBase,
	record?: WarehouseManagementPackageItemsRecord,
) =>
	formOptions({
		defaultValues: {
			package: record?.package ?? "",
			product: record?.product ?? "",
			quantity: record?.quantity ?? 0,
			batch: record?.batch ?? "",
			lotNumber: record?.lotNumber ?? "",
			expiryDate: record?.expiryDate ?? "",
		} as z.infer<typeof UpdatePackageItemsSchema>,
		onSubmit: async ({ value }) => {
			if (!record?.id) {
				throw new Error("Record ID is required for updates");
			}
			try {
				const updated = await pocketbase
					.collection(Collections.WarehouseManagementPackageItems)
					.update(record.id, value as any);
				toast.success(`Package item updated successfully`);
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
