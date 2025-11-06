import { useQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useParams,
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
import { Collections, Update } from "@/lib/pb.types";

const UpdateGeofenceEventFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.TransportManagementGeofenceEvents, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementGeofenceEvents)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementGeofenceEvents>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementGeofenceEvents)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("GeofenceEvent updated successfully");
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
				open={searchParams.action === "updateGeofenceEvent"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update GeofenceEvent"
				description="Records of vehicles entering or exiting geofenced areas for location tracking and alerts"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="geofence">
							{(field) => (
								<field.TextField
									label="Geofence"
									description="The geofence this event is associated with"
									tooltip="e.g., 'GEO-001', 'Zone A', 'Warehouse boundary'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="vehicle">
							{(field) => (
								<field.TextField
									label="Vehicle"
									description="The vehicle that triggered this event"
									tooltip="e.g., 'VEH-001', 'TRUCK-A', 'License ABC123'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Event Type</FieldSeparator>

					{/* Event Type */}
					<FieldGroup>
						<FieldLegend>Event Type</FieldLegend>
						<FieldDescription>Manage event type information</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Whether the vehicle entered or exited the geofence"
									tooltip="e.g., 'entry', 'exit'"
									options={[
										{ label: "Entry", value: "entry" },
										{ label: "Exit", value: "exit" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timestamp</FieldSeparator>

					{/* Timestamp */}
					<FieldGroup>
						<FieldLegend>Timestamp</FieldLegend>
						<FieldDescription>Manage timestamp information</FieldDescription>

						<form.AppField name="timestamp">
							{(field) => (
								<field.DateTimeField
									label="Timestamp"
									description="The date and time when this geofence event occurred"
									tooltip="e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Details</FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="duration">
							{(field) => (
								<field.NumberField
									label="Duration"
									description="Duration spent inside geofence in minutes (for exit events)"
									tooltip="e.g., 30, 120, 300"
									placeholder="0"
									min={0}
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
									description="Additional notes about this geofence event"
									tooltip="e.g., 'Early arrival', 'Extended stay', 'Unexpected entry'"
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

export default UpdateGeofenceEventFormDialog;
