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

const UpdateGeofenceFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.TransportManagementGeofence, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementGeofence)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.TransportManagementGeofence>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementGeofence)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Geofence updated successfully");
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
				open={searchParams.action === "updateGeofence"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Geofence"
				description="Geographic areas defined by coordinates and radius for vehicle tracking and alerts"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Manage basic information information
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="The name of this geofenced area"
									tooltip="e.g., 'Metro Manila Zone', 'Warehouse Area', 'Delivery Zone A'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Location</FieldSeparator>

					{/* Location */}
					<FieldGroup>
						<FieldLegend>Location</FieldLegend>
						<FieldDescription>Manage location information</FieldDescription>

						<form.AppField name="coordinates">
							{(field) => (
								<field.TextField
									label="Coordinates"
									description="Center coordinates in latitude,longitude format"
									tooltip="e.g., '14.5995,120.9842', '14.6091,121.0175'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Boundary</FieldSeparator>

					{/* Boundary */}
					<FieldGroup>
						<FieldLegend>Boundary</FieldLegend>
						<FieldDescription>Manage boundary information</FieldDescription>

						<form.AppField name="radius">
							{(field) => (
								<field.NumberField
									label="Radius"
									description="Radius of the geofenced area in meters"
									tooltip="e.g., 500, 1000, 5000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Details</FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="purpose">
							{(field) => (
								<field.TextField
									label="Purpose"
									description="The purpose or use of this geofence"
									tooltip="e.g., 'Delivery zone', 'Warehouse boundary', 'Restricted area'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Status</FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="isActive">
							{(field) => (
								<field.SelectField
									label="Is Active"
									description="Whether this geofence is currently active"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
										{ label: "True", value: "true" },
										{ label: "False", value: "false" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Alerts</FieldSeparator>

					{/* Alerts */}
					<FieldGroup>
						<FieldLegend>Alerts</FieldLegend>
						<FieldDescription>Manage alerts information</FieldDescription>

						<form.AppField name="alertType">
							{(field) => (
								<field.TextField
									label="Alert Type"
									description="The type of alert to trigger (entry, exit, or both)"
									tooltip="e.g., 'entry-only', 'exit-only', 'both'"
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

export default UpdateGeofenceFormDialog;
