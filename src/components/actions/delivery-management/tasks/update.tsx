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
				description="Represents individual delivery tasks with recipient details, delivery address, timing, and failure tracking for multi-attempt deliveries"
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
									description="The delivery route this task is part of"
									tooltip="e.g., 'ROUTE-001', 'DLV-456'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="package">
							{(field) => (
								<field.TextField
									label="Package"
									description="The package to be delivered"
									tooltip="e.g., 'PKG-001', 'PACK-789'"
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
									description="The complete delivery address"
									tooltip="e.g., '123 Main St, QC', 'Warehouse Building A'"
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
									description="The sequence number of this task in the route"
									tooltip="e.g., 1, 2, 3, 4"
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
									description="The current delivery status of this task"
									tooltip="e.g., 'pending', 'assigned', 'delivered'"
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
									description="Name of the package recipient"
									tooltip="e.g., 'John Doe', 'ABC Corporation'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="recipientPhone">
							{(field) => (
								<field.TextField
									label="Recipient Phone"
									description="Contact phone number of the recipient"
									tooltip="e.g., '+63 9123456789', '02-1234-5678'"
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
									description="Special delivery instructions or handling requirements"
									tooltip="e.g., 'Ring bell twice', 'Leave at gate'"
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
									description="Estimated time of arrival at delivery location"
									tooltip="e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="actualArrivalTime">
							{(field) => (
								<field.DateTimeField
									label="Actual Arrival Time"
									description="Actual arrival time at delivery location"
									tooltip="e.g., 01/15/2024 10:25 AM, 02/01/2024 14:50"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="deliveryTime">
							{(field) => (
								<field.DateTimeField
									label="Delivery Time"
									description="Time when the delivery was completed"
									tooltip="e.g., 01/15/2024 10:35 AM, 02/01/2024 15:00"
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
									description="Reason if delivery failed or did not complete"
									tooltip="e.g., 'recipient-not-home', 'address-not-found'"
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
									description="Number of delivery attempts made for this task"
									tooltip="e.g., 1, 2, 3"
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
