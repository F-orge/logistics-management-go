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

const UpdateDriverLocationFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.DeliveryManagementDriverLocation, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.DeliveryManagementDriverLocation)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.DeliveryManagementDriverLocation>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.DeliveryManagementDriverLocation)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("DriverLocation updated successfully");
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
				open={searchParams.action === "updateDriverLocation"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update DriverLocation"
				description="Tracks real-time GPS coordinates of drivers including heading, speed, accuracy, and timestamp"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="driver">
							{(field) => (
								<field.TextField
									label="Driver"
									description="The driver being tracked"
									tooltip="e.g., 'DRV-001', 'Juan Dela Cruz'"
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
									description="Current GPS coordinates (latitude, longitude)"
									tooltip="e.g., '14.5995, 120.9842'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Movement</FieldSeparator>

					{/* Movement */}
					<FieldGroup>
						<FieldLegend>Movement</FieldLegend>
						<FieldDescription>Manage movement information</FieldDescription>

						<form.AppField name="heading">
							{(field) => (
								<field.TextField
									label="Heading"
									description="Direction of driver movement"
									tooltip="e.g., '120' (degrees), 'NE'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="speed">
							{(field) => (
								<field.NumberField
									label="Speed"
									description="Current speed in km/h"
									tooltip="e.g., 30, 60, 80"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Accuracy</FieldSeparator>

					{/* Accuracy */}
					<FieldGroup>
						<FieldLegend>Accuracy</FieldLegend>
						<FieldDescription>Manage accuracy information</FieldDescription>

						<form.AppField name="accuracy">
							{(field) => (
								<field.NumberField
									label="Accuracy"
									description="GPS accuracy in meters"
									tooltip="e.g., 5, 10, 20"
									placeholder="0"
									min={0}
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
									description="Time when location was recorded"
									tooltip="e.g., 01/15/2024 08:30 AM"
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

export default UpdateDriverLocationFormDialog;
