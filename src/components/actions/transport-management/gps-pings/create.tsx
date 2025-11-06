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

const CreateGpsPingFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.TransportManagementGpsPings>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementGpsPings)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("GpsPing created successfully");
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
				open={searchParams.action === "createGpsPing"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create GpsPing"
				description="GPS location data points recorded for vehicle tracking and route analysis"
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
									description="The vehicle being tracked"
									tooltip="e.g., 'VEH-001', 'TRUCK-A', 'License ABC123'"
									placeholder=""
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

						<form.AppField name="coordinates">
							{(field) => (
								<field.TextField
									label="Coordinates"
									description="GPS coordinates in latitude,longitude format"
									tooltip="e.g., '14.5995,120.9842', '14.6091,121.0175'"
									placeholder=""
									required
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
									description="The date and time of this GPS reading"
									tooltip="e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Details</FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="accuracy">
							{(field) => (
								<field.NumberField
									label="Accuracy"
									description="GPS accuracy in meters"
									tooltip="e.g., 5, 10, 50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="speed">
							{(field) => (
								<field.NumberField
									label="Speed"
									description="Vehicle speed in km/h at this reading"
									tooltip="e.g., 0, 25, 60"
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

export default CreateGpsPingFormDialog;
