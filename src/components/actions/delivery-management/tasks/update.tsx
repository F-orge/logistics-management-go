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

const UpdateTaskFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.DeliveryManagementTasks, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.DeliveryManagementTasks)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.DeliveryManagementTasks>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.DeliveryManagementTasks)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Task updated successfully");
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
				open={searchParams.action === "updateTask"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Task"
				description="Edit Task information"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="route">
							{(field) => (
								<field.TextField
									label="Route"
									description="Enter route"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="package">
							{(field) => (
								<field.TextField
									label="Package"
									description="Enter package"
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

						<form.AppField name="deliveryAddress">
							{(field) => (
								<field.TextField
									label="Delivery Address"
									description="Enter deliveryaddress"
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
									description="Enter number"
									placeholder="0"
									min={0}
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
									description="Select an option"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Assigned", value: "assigned" },
										{ label: "Out For Delivery", value: "out-for-delivery" },
										{ label: "Delivered", value: "delivered" },
										{ label: "Failed", value: "failed" },
										{ label: "Cancelled", value: "cancelled" },
										{ label: "Rescheduled", value: "rescheduled" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Recipient</FieldSeparator>

					{/* Recipient */}
					<FieldGroup>
						<FieldLegend>Recipient</FieldLegend>
						<FieldDescription>Manage recipient information</FieldDescription>

						<form.AppField name="recipientName">
							{(field) => (
								<field.TextField
									label="Recipient Name"
									description="Enter recipientname"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="recipientPhone">
							{(field) => (
								<field.TextField
									label="Recipient Phone"
									description="Enter recipientphone"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Instructions</FieldSeparator>

					{/* Instructions */}
					<FieldGroup>
						<FieldLegend>Instructions</FieldLegend>
						<FieldDescription>Manage instructions information</FieldDescription>

						<form.AppField name="deliveryInstructions">
							{(field) => (
								<field.TextareaField
									label="Delivery Instructions"
									description="Enter details"
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
									description="Select date and time"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="actualArrivalTime">
							{(field) => (
								<field.DateTimeField
									label="Actual Arrival Time"
									description="Select date and time"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="deliveryTime">
							{(field) => (
								<field.DateTimeField
									label="Delivery Time"
									description="Select date and time"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Failure Details</FieldSeparator>

					{/* Failure Details */}
					<FieldGroup>
						<FieldLegend>Failure Details</FieldLegend>
						<FieldDescription>
							Manage failure details information
						</FieldDescription>

						<form.AppField name="failureReason">
							{(field) => (
								<field.SelectField
									label="Failure Reason"
									description="Select an option"
									options={[
										{
											label: "Recipient Not Home",
											value: "recipient-not-home",
										},
										{ label: "Address Not Found", value: "address-not-found" },
										{ label: "Refused Delivery", value: "refused-delivery" },
										{ label: "Damaged Package", value: "damaged-package" },
										{ label: "Access Denied", value: "access-denied" },
										{
											label: "Weather Conditions",
											value: "weather-conditions",
										},
										{ label: "Vehicle Breakdown", value: "vehicle-breakdown" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Attempts</FieldSeparator>

					{/* Attempts */}
					<FieldGroup>
						<FieldLegend>Attempts</FieldLegend>
						<FieldDescription>Manage attempts information</FieldDescription>

						<form.AppField name="attemptCount">
							{(field) => (
								<field.NumberField
									label="Attempt Count"
									description="Enter number"
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

export default UpdateTaskFormDialog;
