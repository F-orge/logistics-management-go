import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
	Collections,
	TypedPocketBase,
	WarehouseManagementWarehousesRecord,
} from "@/lib/pb.types";
import {
	CreateWarehousesSchema,
	UpdateWarehousesSchema,
	WarehousesSchema,
} from "@/pocketbase/schemas/warehouse-management/warehouses";

export type WarehousesFormProps = {
	action?: "create" | "edit";
};

export const WarehousesForm = withForm({
	defaultValues: {} as z.infer<typeof WarehousesSchema>,
	props: {} as WarehousesFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* name - string */}
				<form.AppField name="name">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Name"
							description="Warehouse name"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* address - string */}
				<form.AppField name="address">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Address"
							description="Street address"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* city - string */}
				<form.AppField name="city">
					{(field) => (
						<field.Field className="col-span-1" label="City" description="City">
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* state - string */}
				<form.AppField name="state">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="State"
							description="State/Province"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* postalCode - string */}
				<form.AppField name="postalCode">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Postal Code"
							description="Postal/ZIP code"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* country - string */}
				<form.AppField name="country">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Country"
							description="Country"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* timezone - string */}
				<form.AppField name="timezone">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Timezone"
							description="Warehouse timezone (e.g., UTC, EST)"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* contactPerson - string */}
				<form.AppField name="contactPerson">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Contact Person"
							description="Primary contact name"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* contactEmail - string */}
				<form.AppField name="contactEmail">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Contact Email"
							description="Contact email address"
						>
							<field.EmailField />
						</field.Field>
					)}
				</form.AppField>
				{/* contactPhone - string */}
				<form.AppField name="contactPhone">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Contact Phone"
							description="Contact phone number"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* isActive - boolean */}
				<form.AppField name="isActive">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Active"
							description="Warehouse is active"
						>
							<field.BoolField />
						</field.Field>
					)}
				</form.AppField>
				{/* images - file array */}
				<form.AppField name="images">
					{(field) => (
						<field.Field
							className="col-span-4"
							label="Images"
							description="Warehouse images"
						>
							<field.FileField />
						</field.Field>
					)}
				</form.AppField>
				{/* location - json */}
				<form.AppField name="location">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Location"
							description="Geographic location data"
						>
							<field.GeoPointField />
						</field.Field>
					)}
				</form.AppField>
			</form.FieldSet>
		);
	},
});

export const CreateWarehousesFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			name: "",
			address: "",
			city: "",
			state: "",
			postalCode: "",
			country: "",
			timezone: "",
			contactPerson: "",
			contactEmail: "",
			contactPhone: "",
			isActive: true,
			images: [],
			location: undefined,
		} as Partial<z.infer<ReturnType<typeof CreateWarehousesSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementWarehouses)
					.create(value);

				toast.success("Warehouse created successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });
					toast.error(
						`Failed to create warehouse: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateWarehousesFormOption = (
	pocketbase: TypedPocketBase,
	record?: WarehouseManagementWarehousesRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateWarehousesSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementWarehouses)
					.update(record?.id!, value);

				toast.success("Warehouse updated successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });
					toast.error(
						`Failed to update warehouse: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
