import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
	Collections,
	TypedPocketBase,
	WarehouseManagementLocationsRecord,
	WarehouseManagementLocationsResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import {
	CreateLocationsSchema,
	LocationsSchema,
	UpdateLocationsSchema,
} from "@/pocketbase/schemas/warehouse-management/locations";

export type LocationsFormProps = {
	action?: "create" | "edit";
};

export const LocationsForm = withForm({
	defaultValues: {} as z.infer<typeof LocationsSchema>,
	props: {} as LocationsFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* warehouse - string (relation) */}
				<form.AppField name="warehouse">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Warehouse"
							description="Associated warehouse"
						>
							<field.RelationField<WarehouseManagementWarehousesResponse>
								collectionName={Collections.WarehouseManagementWarehouses}
								relationshipName="warehouse"
								renderOption={(item) => `${item.name}`}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* name - string */}
				<form.AppField name="name">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Name"
							description="Location name"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* barcode - string */}
				<form.AppField name="barcode">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Barcode"
							description="Location barcode"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* type - enum */}
				<form.AppField name="type">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Type"
							description="Location type"
						>
							<field.SelectField
								options={[
									{ value: "receiving-dock", label: "Receiving Dock" },
									{ value: "pick-bin", label: "Pick Bin" },
									{ value: "packing-station", label: "Packing Station" },
									{ value: "cross-dock-area", label: "Cross Dock Area" },
									{ value: "bulk-storage", label: "Bulk Storage" },
									{ value: "reserve-storage", label: "Reserve Storage" },
									{ value: "damaged-goods", label: "Damaged Goods" },
									{ value: "staging-area", label: "Staging Area" },
									{ value: "quality-control", label: "Quality Control" },
									{ value: "returns-area", label: "Returns Area" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* level - number */}
				<form.AppField name="level">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Level"
							description="Storage level"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* maxWeight - number */}
				<form.AppField name="maxWeight">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Max Weight"
							description="Maximum weight capacity"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* maxVolume - number */}
				<form.AppField name="maxVolume">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Max Volume"
							description="Maximum volume capacity"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* maxPallets - number */}
				<form.AppField name="maxPallets">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Max Pallets"
							description="Maximum pallet count"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* isPickable - boolean */}
				<form.AppField name="isPickable">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Pickable"
							description="Can pick from this location"
						>
							<field.BoolField />
						</field.Field>
					)}
				</form.AppField>
				{/* isReceivable - boolean */}
				<form.AppField name="isReceivable">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Receivable"
							description="Can receive items here"
						>
							<field.BoolField />
						</field.Field>
					)}
				</form.AppField>
				{/* temperatureControlled - boolean */}
				<form.AppField name="temperatureControlled">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Temperature Controlled"
							description="Has temperature control"
						>
							<field.BoolField />
						</field.Field>
					)}
				</form.AppField>
				{/* hazmatApproved - boolean */}
				<form.AppField name="hazmatApproved">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Hazmat Approved"
							description="Approved for hazardous materials"
						>
							<field.BoolField />
						</field.Field>
					)}
				</form.AppField>
				{/* isActive - boolean */}
				<form.AppField name="isActive">
					{(field) => (
						<field.Field
							className="col-span-1"
							label="Active"
							description="Location is active"
						>
							<field.BoolField />
						</field.Field>
					)}
				</form.AppField>
				{/* parentLocation - string (relation) */}
				<form.AppField name="parentLocation">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Parent Location"
							description="Parent location (optional)"
						>
							<field.RelationField<WarehouseManagementLocationsResponse>
								collectionName={Collections.WarehouseManagementLocations}
								relationshipName="parentLocation"
								renderOption={(item) => `${item.name}`}
							/>
						</field.Field>
					)}
				</form.AppField>
			</form.FieldSet>
		);
	},
});

export const CreateLocationsFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			warehouse: undefined,
			name: "",
			barcode: "",
			type: undefined,
			level: 0,
			maxWeight: 0,
			maxVolume: 0,
			maxPallets: 0,
			isPickable: false,
			isReceivable: false,
			temperatureControlled: false,
			hazmatApproved: false,
			isActive: true,
			parentLocation: undefined,
		} as Partial<z.infer<ReturnType<typeof CreateLocationsSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementLocations)
					.create(value);

				toast.success("Location created successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });
					toast.error(
						`Failed to create location: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateLocationsFormOption = (
	pocketbase: TypedPocketBase,
	record?: WarehouseManagementLocationsRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateLocationsSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementLocations)
					.update(record?.id!, value);

				toast.success("Location updated successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });
					toast.error(
						`Failed to update location: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
