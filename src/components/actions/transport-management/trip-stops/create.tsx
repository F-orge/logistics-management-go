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

const CreateTripStopFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementTripStops>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementTripStops)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("TripStop created successfully");
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
				open={searchParams.action === "createTripStop"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create TripStop"
				description="Defines individual stops within a trip with sequencing, location details, shipment references, and timing estimates"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="trip">
							{(field) => (
								<field.TextField
									label="Trip"
									description="The trip this stop is part of"
									tooltip="e.g., 'TRIP-2024-001', 'DLV-456'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="shipment">
							{(field) => (
								<field.TextField
									label="Shipment"
									description="The shipment being delivered or picked up at this stop"
									tooltip="e.g., 'SHP-2024-001', 'BL-789456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Routing</FieldSeparator>

					{/* Routing */}
					<FieldGroup>
						<FieldLegend>Routing</FieldLegend>
						<FieldDescription>Manage routing information</FieldDescription>

						<form.AppField name="sequence">
							{(field) => (
								<field.NumberField
									label="Sequence"
									description="The sequence number of this stop in the trip order"
									tooltip="e.g., 1, 2, 3, 4"
									placeholder="0"
									min={0}
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
									description="The current status of this stop"
									tooltip="e.g., 'pending', 'arrived', 'completed'"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Arrived", value: "arrived" },
										{ label: "Completed", value: "completed" },
										{ label: "Skipped", value: "skipped" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Location</FieldSeparator>

					{/* Location */}
					<FieldGroup>
						<FieldLegend>Location</FieldLegend>
						<FieldDescription>Manage location information</FieldDescription>

						<form.AppField name="address">
							{(field) => (
								<field.TextField
									label="Address"
									description="The physical address of this stop"
									tooltip="e.g., '123 Main St, QC', 'Warehouse Building A'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timing</FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="estimatedArrivalTime">
							{(field) => (
								<field.DateTimeField
									label="Estimated Arrival Time"
									description="The estimated time of arrival at this stop"
									tooltip="e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="estimatedDepartureTime">
							{(field) => (
								<field.DateTimeField
									label="Estimated Departure Time"
									description="The estimated time of departure from this stop"
									tooltip="e.g., 01/15/2024 11:00 AM, 02/01/2024 15:15"
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
									description="Special instructions or notes for this stop"
									tooltip="e.g., 'Ring bell twice', 'Signature required'"
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

export default CreateTripStopFormDialog;
