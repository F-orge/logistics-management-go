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

const UpdateInventoryAdjustmentFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [
			Collections.WarehouseManagementInventoryAdjustment,
			searchParams.id,
		],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementInventoryAdjustment)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementInventoryAdjustment>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInventoryAdjustment)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("InventoryAdjustment updated successfully");
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
				open={searchParams.action === "updateInventoryAdjustment"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update InventoryAdjustment"
				description="Logs inventory adjustments (damage, loss, count discrepancies, returns, transfers) with reasons and notes"
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
									description="The warehouse where adjustment occurred"
									tooltip="e.g., 'WH-001', 'Manila Warehouse'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product being adjusted"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
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
									description="Batch or lot number affected"
									tooltip="e.g., 'BATCH-2024-001', 'LOT123'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Adjustment</FieldSeparator>

					{/* Adjustment */}
					<FieldGroup>
						<FieldLegend>Adjustment</FieldLegend>
						<FieldDescription>Manage adjustment information</FieldDescription>

						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="Quantity adjusted (positive or negative)"
									tooltip="e.g., -5 (loss), 10 (gain), 2 (correction)"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="reason">
							{(field) => (
								<field.SelectField
									label="Reason"
									description="Reason for the adjustment"
									tooltip="e.g., 'damage', 'loss', 'count-discrepancy', 'return'"
									options={[]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dates</FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="adjustmentDate">
							{(field) => (
								<field.DateTimeField
									label="Adjustment Date"
									description="Date of the adjustment"
									tooltip="e.g., 01/15/2024, 02/01/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Audit</FieldSeparator>

					{/* Audit */}
					<FieldGroup>
						<FieldLegend>Audit</FieldLegend>
						<FieldDescription>Manage audit information</FieldDescription>

						<form.AppField name="adjustedBy">
							{(field) => (
								<field.TextField
									label="Adjusted By"
									description="User who made the adjustment"
									tooltip="e.g., 'USR-001', 'John Doe'"
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

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Additional notes about the adjustment"
									tooltip="e.g., 'Water damage during storage', 'Found during cycle count'"
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

export default UpdateInventoryAdjustmentFormDialog;
