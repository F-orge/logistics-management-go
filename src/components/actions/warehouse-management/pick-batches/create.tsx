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

const CreatePickBatchFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementPickBatches>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementPickBatches)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("PickBatch created successfully");
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
				open={searchParams.action === "createPickBatch"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create PickBatch"
				description="Groups orders into picking batches with strategy (zone, batch, wave, cluster) and performance metrics"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="warehouse">
							{(field) => (
								<field.TextField
									label="Warehouse"
									description="The warehouse where this batch will be picked"
									tooltip="e.g., 'WH-001', 'Manila Warehouse'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Identification</FieldSeparator>

					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="batchNumber">
							{(field) => (
								<field.TextField
									label="Batch Number"
									description="Unique identifier for this pick batch"
									tooltip="e.g., 'PB-2024-001', 'PICK-789'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Priority</FieldSeparator>

					{/* Priority */}
					<FieldGroup>
						<FieldLegend>Priority</FieldLegend>
						<FieldDescription>Manage priority information</FieldDescription>

						<form.AppField name="priority">
							{(field) => (
								<field.NumberField
									label="Priority"
									description="Priority level for processing"
									tooltip="e.g., 1 (highest), 2, 3"
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
									description="Current status of the batch"
									tooltip="e.g., 'pending', 'in-progress', 'completed'"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Assigned", value: "assigned" },
										{ label: "In Progress", value: "in-progress" },
										{ label: "Completed", value: "completed" },
										{ label: "Cancelled", value: "cancelled" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Strategy</FieldSeparator>

					{/* Strategy */}
					<FieldGroup>
						<FieldLegend>Strategy</FieldLegend>
						<FieldDescription>Manage strategy information</FieldDescription>

						<form.AppField name="strategy">
							{(field) => (
								<field.SelectField
									label="Strategy"
									description="Picking strategy used for this batch"
									tooltip="e.g., 'zone', 'batch', 'wave', 'cluster'"
									options={[
										{ label: "Zone", value: "zone" },
										{ label: "Batch", value: "batch" },
										{ label: "Wave", value: "wave" },
										{ label: "Cluster", value: "cluster" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Assignment</FieldSeparator>

					{/* Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>Manage assignment information</FieldDescription>

						<form.AppField name="assignedUser">
							{(field) => (
								<field.TextField
									label="Assigned User"
									description="Worker assigned to pick this batch"
									tooltip="e.g., 'WRK-001', 'Juan Dela Cruz'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Items</FieldSeparator>

					{/* Items */}
					<FieldGroup>
						<FieldLegend>Items</FieldLegend>
						<FieldDescription>Manage items information</FieldDescription>

						<form.AppField name="totalItems">
							{(field) => (
								<field.NumberField
									label="Total Items"
									description="Total line items to pick"
									tooltip="e.g., 10, 25, 50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="completedItems">
							{(field) => (
								<field.NumberField
									label="Completed Items"
									description="Number of items already picked"
									tooltip="e.g., 5, 25, 50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Duration</FieldSeparator>

					{/* Duration */}
					<FieldGroup>
						<FieldLegend>Duration</FieldLegend>
						<FieldDescription>Manage duration information</FieldDescription>

						<form.AppField name="estimatedDuration">
							{(field) => (
								<field.NumberField
									label="Estimated Duration"
									description="Estimated picking time in minutes"
									tooltip="e.g., 15, 30, 60"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="actualDuration">
							{(field) => (
								<field.NumberField
									label="Actual Duration"
									description="Actual time taken in minutes"
									tooltip="e.g., 20, 45, 75"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timing</FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="startedAt">
							{(field) => (
								<field.DateTimeField
									label="Started At"
									description="When picking started"
									tooltip="e.g., 01/15/2024 08:30 AM"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="completedAt">
							{(field) => (
								<field.DateTimeField
									label="Completed At"
									description="When picking was completed"
									tooltip="e.g., 01/15/2024 09:30 AM"
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

export default CreatePickBatchFormDialog;
