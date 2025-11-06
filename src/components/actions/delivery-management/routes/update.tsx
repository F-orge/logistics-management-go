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

const UpdateRouteFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.DeliveryManagementRoutes, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.DeliveryManagementRoutes)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.DeliveryManagementRoutes>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.DeliveryManagementRoutes)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Route updated successfully");
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
				open={searchParams.action === "updateRoute"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Route"
				description="Plans delivery routes with driver and vehicle assignments, tracking status, distance, and estimated duration"
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
									description="The driver assigned to this delivery route"
									tooltip="e.g., 'DRV-001', 'Juan Dela Cruz'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="vehicle">
							{(field) => (
								<field.TextField
									label="Vehicle"
									description="The vehicle assigned to this delivery route"
									tooltip="e.g., 'VEH-001', 'ABC-1234'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Schedule</FieldSeparator>

					{/* Schedule */}
					<FieldGroup>
						<FieldLegend>Schedule</FieldLegend>
						<FieldDescription>Manage schedule information</FieldDescription>

						<form.AppField name="routeDate">
							{(field) => (
								<field.DateTimeField
									label="Route Date"
									description="The date for this delivery route"
									tooltip="e.g., 01/15/2024, 02/01/2024"
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

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="The current status of the delivery route"
									tooltip="e.g., 'planned', 'in-progress', 'completed'"
									options={[
										{ label: "Planned", value: "planned" },
										{ label: "In Progress", value: "in-progress" },
										{ label: "Completed", value: "completed" },
										{ label: "Cancelled", value: "cancelled" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Metrics</FieldSeparator>

					{/* Metrics */}
					<FieldGroup>
						<FieldLegend>Metrics</FieldLegend>
						<FieldDescription>Manage metrics information</FieldDescription>

						<form.AppField name="totalDistance">
							{(field) => (
								<field.NumberField
									label="Total Distance"
									description="Total distance to cover in kilometers"
									tooltip="e.g., 50, 125.5, 250"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="estimatedDurationInMinutes">
							{(field) => (
								<field.NumberField
									label="Estimated Duration In Minutes"
									description="Estimated total duration of the route in minutes"
									tooltip="e.g., 180, 300, 480"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default UpdateRouteFormDialog;
