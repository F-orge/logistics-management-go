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

const CreateTaskItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementTaskItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementTaskItems)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("TaskItem created successfully");
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
				open={searchParams.action === "createTaskItem"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create TaskItem"
				description="Individual items within warehouse tasks tracking product, locations, quantities, and completion status"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="task">
							{(field) => (
								<field.TextField
									label="Task"
									description="The parent task for this item"
									tooltip="e.g., 'TASK-2024-001', 'PK-789'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product in this task item"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
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

						<form.AppField name="sourceLocation">
							{(field) => (
								<field.TextField
									label="Source Location"
									description="Where to pick the item from"
									tooltip="e.g., 'LOC-A-01-01', 'BIN-005'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="destinationLocation">
							{(field) => (
								<field.TextField
									label="Destination Location"
									description="Where to move the item to"
									tooltip="e.g., 'LOC-B-02-03', 'STAGE-01'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Batch</FieldSeparator>

					{/* Batch */}
					<FieldGroup>
						<FieldLegend>Batch</FieldLegend>
						<FieldDescription>Manage batch information</FieldDescription>

						<form.AppField name="batch">
							{(field) => (
								<field.TextField
									label="Batch"
									description="Batch or lot number of the item"
									tooltip="e.g., 'BATCH-2024-001', 'LOT123'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Quantity</FieldSeparator>

					{/* Quantity */}
					<FieldGroup>
						<FieldLegend>Quantity</FieldLegend>
						<FieldDescription>Manage quantity information</FieldDescription>

						<form.AppField name="quantityRequired">
							{(field) => (
								<field.NumberField
									label="Quantity Required"
									description="Quantity needed for this item"
									tooltip="e.g., 5, 10, 25"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="quantityCompleted">
							{(field) => (
								<field.NumberField
									label="Quantity Completed"
									description="Quantity actually completed"
									tooltip="e.g., 5, 8, 10"
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
									description="Choose a status value from the available options"
									tooltip="Task item status"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "In Progress", value: "in-progress" },
										{ label: "Completed", value: "completed" },
										{ label: "Failed", value: "failed" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Completion</FieldSeparator>

					{/* Completion */}
					<FieldGroup>
						<FieldLegend>Completion</FieldLegend>
						<FieldDescription>Manage completion information</FieldDescription>

						<form.AppField name="completedAt">
							{(field) => (
								<field.DateTimeField
									label="Completed At"
									description="Select a date and time for completed at"
									tooltip="When this item was completed"
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
									description="Enter detailed information about notes"
									tooltip="Notes on this task item"
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

export default CreateTaskItemFormDialog;
