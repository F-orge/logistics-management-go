import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React from "react";
import { toast } from "sonner";
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { useAppForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import { Collections, Create } from "@/lib/pb.types";

const CreateVehicleMaintenanceFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues:
			{} as Create<Collections.TransportManagementVehicleMaintenance>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementVehicleMaintenance)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("VehicleMaintenance created successfully");
			} catch (error) {
				if (error instanceof ClientResponseError) {
					toast.error(error.message);
				}
			}
		},
	});

	return (
		<form.AppForm>
			<FormDialog
				open={searchParams.action === "createVehicleMaintenance"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create VehicleMaintenance"
				description="Logs vehicle maintenance records including service dates, types, and costs for preventive maintenance tracking"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="vehicle">
							{(field) => (
								<field.TextField
									label="Vehicle"
									description="The vehicle being maintained"
									tooltip="e.g., 'VEH-001', 'ABC-1234'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Service Details</FieldSeparator>

					{/* Service Details */}
					<FieldGroup>
						<FieldLegend>Service Details</FieldLegend>
						<FieldDescription>
							Manage service details information
						</FieldDescription>

						<form.AppField name="serviceDate">
							{(field) => (
								<field.DateTimeField
									label="Service Date"
									description="The date when the service was performed"
									tooltip="e.g., 01/15/2024, 02/01/2024"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="serviceType">
							{(field) => (
								<field.TextField
									label="Service Type"
									description="The type of service performed"
									tooltip="e.g., 'Oil change', 'Tire rotation', 'Brake inspection'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Financial</FieldSeparator>

					{/* Financial */}
					<FieldGroup>
						<FieldLegend>Financial</FieldLegend>
						<FieldDescription>Manage financial information</FieldDescription>

						<form.AppField name="cost">
							{(field) => (
								<field.NumberField
									label="Cost"
									description="The cost of this maintenance service"
									tooltip="e.g., 500, 1500.50, 5000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Additional Information</FieldSeparator>

					{/* Additional Information */}
					<FieldGroup>
						<FieldLegend>Additional Information</FieldLegend>
						<FieldDescription>
							Manage additional information information
						</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Additional notes about the service performed"
									tooltip="e.g., 'Replaced brake pads', 'Engine oil filter changed'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateVehicleMaintenanceFormDialog;
