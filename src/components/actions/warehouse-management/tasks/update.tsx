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
		queryKey: [Collections.WarehouseManagementTasks, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementTasks)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementTasks>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementTasks)
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
				description="Manages warehouse tasks (picking, putaway, packing, restocking, counting) with assignment and timing"
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
									description="The warehouse for this task"
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

						<form.AppField name="taskNumber">
							{(field) => (
								<field.TextField
									label="Task Number"
									description="Unique task identifier"
									tooltip="e.g., 'TASK-2024-001', 'PK-789'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Type</FieldSeparator>

					{/* Type */}
					<FieldGroup>
						<FieldLegend>Type</FieldLegend>
						<FieldDescription>Manage type information</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Type of warehouse task to perform"
									tooltip="e.g., 'pick', 'putaway', 'packing', 'restock'"
									options={[
										{ label: "Pick", value: "pick" },
										{ label: "Putaway", value: "putaway" },
										{ label: "Packing", value: "packing" },
										{ label: "Restock", value: "restock" },
										{ label: "Count", value: "count" },
										{ label: "Transfer", value: "transfer" },
									]}
									placeholder="Select..."
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
									description="Current status of the task"
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

					<FieldSeparator>Priority</FieldSeparator>

					{/* Priority */}
					<FieldGroup>
						<FieldLegend>Priority</FieldLegend>
						<FieldDescription>Manage priority information</FieldDescription>

						<form.AppField name="priority">
							{(field) => (
								<field.NumberField
									label="Priority"
									description="Priority level for this task"
									tooltip="e.g., 1 (highest), 2, 3"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>User</FieldSeparator>

					{/* User */}
					<FieldGroup>
						<FieldLegend>User</FieldLegend>
						<FieldDescription>Manage user information</FieldDescription>

						<form.AppField name="user">
							{(field) => (
								<field.TextField
									label="User"
									description="User assigned to this task"
									tooltip="e.g., 'WRK-001', 'Juan Dela Cruz'"
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

						<form.AppField name="startTime">
							{(field) => (
								<field.DateTimeField
									label="Start Time"
									description="When task was started"
									tooltip="e.g., 01/15/2024 08:30 AM"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="endTime">
							{(field) => (
								<field.DateTimeField
									label="End Time"
									description="When task was completed"
									tooltip="e.g., 01/15/2024 02:30 PM"
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

						<form.AppField name="instructions">
							{(field) => (
								<field.TextareaField
									label="Instructions"
									description="Detailed instructions for completing the task"
									tooltip="e.g., 'Pick items in FIFO order', 'Use zone 5 bins first'"
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
									description="Additional notes about the task"
									tooltip="e.g., 'Item out of stock', 'Bin damaged'"
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

export default UpdateTaskFormDialog;
