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

const CreateTripFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementTrips>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementTrips)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Trip created successfully");
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
				open={searchParams.action === "createTrip"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Trip"
				description="Records trips combining driver and vehicle assignments with status tracking through the journey lifecycle"
			>
				<FieldSet>
					{/* Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>Manage assignment information</FieldDescription>

						<form.AppField name="driver">
							{(field) => (
								<field.TextField
									label="Driver"
									description="The driver assigned to this trip"
									tooltip="e.g., 'DRV-001', 'Juan Dela Cruz'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="vehicle">
							{(field) => (
								<field.TextField
									label="Vehicle"
									description="The vehicle assigned to this trip"
									tooltip="e.g., 'VEH-001', 'ABC-1234'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Status</FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="The current status of the trip"
									tooltip="e.g., 'planned', 'in-progress', 'completed'"
									options={[
										{ label: "Planned", value: "planned" },
										{ label: "In Progress", value: "in-progress" },
										{ label: "Completed", value: "completed" },
										{ label: "Cancelled", value: "cancelled" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timing</FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="startTime">
							{(field) => (
								<field.DateTimeField
									label="Start Time"
									description="When the trip started or is scheduled to start"
									tooltip="e.g., 01/15/2024 08:00 AM, 02/01/2024 06:30"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="endTime">
							{(field) => (
								<field.DateTimeField
									label="End Time"
									description="When the trip ended or is scheduled to end"
									tooltip="e.g., 01/15/2024 06:00 PM, 02/01/2024 18:30"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Route</FieldSeparator>

					{/* Route */}
					<FieldGroup>
						<FieldLegend>Route</FieldLegend>
						<FieldDescription>Manage route information</FieldDescription>

						<form.AppField name="route">
							{(field) => (
								<field.TextField
									label="Route"
									description="The predefined route for this trip"
									tooltip="e.g., 'Route A', 'Daily Circuit North'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Notes</FieldSeparator>

					{/* Notes */}
					<FieldGroup>
						<FieldLegend>Notes</FieldLegend>
						<FieldDescription>Manage notes information</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Additional notes or special instructions for this trip"
									tooltip="e.g., 'Priority shipments', 'Special handling required'"
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

export default CreateTripFormDialog;
