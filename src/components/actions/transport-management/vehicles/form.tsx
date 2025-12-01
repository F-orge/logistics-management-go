import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
	Collections,
	TransportManagementVehiclesRecord,
	TypedPocketBase,
} from "@/lib/pb.types";
import {
	CreateVehiclesSchema,
	UpdateVehiclesSchema,
	VehiclesSchema,
} from "@/pocketbase/schemas/transport-management/vehicles";

export type VehiclesFormProps = {
	action?: "create" | "edit";
};

export const VehiclesForm = withForm({
	defaultValues: {} as z.infer<typeof VehiclesSchema>,
	props: {} as VehiclesFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* registrationNumber - string */}
				<form.AppField name="registrationNumber">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Registration Number"
							description="Vehicle registration/license plate"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* model - string */}
				<form.AppField name="model">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Model"
							description="Vehicle model and make"
						>
							<field.TextField />
						</field.Field>
					)}
				</form.AppField>
				{/* capacityVolume - number */}
				<form.AppField name="capacityVolume">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Capacity Volume"
							description="Volume capacity in cubic units"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* capacityWeight - number */}
				<form.AppField name="capacityWeight">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Capacity Weight"
							description="Weight capacity in kg"
						>
							<field.NumberField />
						</field.Field>
					)}
				</form.AppField>
				{/* status - enum */}
				<form.AppField name="status">
					{(field) => (
						<field.Field
							className="col-span-full"
							label="Status"
							description="Vehicle operational status"
						>
							<field.SelectField
								options={[
									{ label: "Available", value: "available" },
									{ label: "In Maintenance", value: "in-maintenance" },
									{ label: "On Trip", value: "on-trip" },
									{ label: "Out of Service", value: "out-of-service" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
			</form.FieldSet>
		);
	},
});

export const CreateVehiclesFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			registrationNumber: "",
			model: "",
			capacityVolume: 0,
			capacityWeight: 0,
			status: "available",
			maintenances: [],
			gps_pings: [],
		} as Partial<z.infer<ReturnType<typeof CreateVehiclesSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementVehicles)
					.create(value);

				toast.success("Vehicle created successfully!");

				meta.navigate!({
					search: (prev) => ({ ...prev, action: undefined }),
				});
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });

					toast.error(
						`Failed to create vehicle: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateVehiclesFormOption = (
	pocketbase: TypedPocketBase,
	record?: TransportManagementVehiclesRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateVehiclesSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementVehicles)
					.update(record?.id!, value);

				toast.success("Vehicle updated successfully!");

				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: error.data.data });

					toast.error(
						`Failed to update vehicle: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
