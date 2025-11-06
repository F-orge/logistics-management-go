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

const UpdatePickBatchItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.WarehouseManagementPickBatchItems, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementPickBatchItems)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementPickBatchItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementPickBatchItems)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("PickBatchItem updated successfully");
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
				open={searchParams.action === "updatePickBatchItem"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update PickBatchItem"
				description="Links sales orders to pick batches tracking pick priority and time performance data"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="pickBatch">
							{(field) => (
								<field.TextField
									label="Pick Batch"
									description="The pick batch this item belongs to"
									tooltip="e.g., 'PB-2024-001', 'PICK-789'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="salesOrder">
							{(field) => (
								<field.TextField
									label="Sales Order"
									description="The sales order to pick"
									tooltip="e.g., 'SO-2024-001', 'ORD-789'"
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

						<form.AppField name="orderPriority">
							{(field) => (
								<field.NumberField
									label="Order Priority"
									description="Picking priority within this batch"
									tooltip="e.g., 1, 2, 3"
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

						<form.AppField name="estimatedPickTime">
							{(field) => (
								<field.DateTimeField
									label="Estimated Pick Time"
									description="Select a date and time for estimated pick time"
									tooltip="Estimated pick time"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="actualPickTime">
							{(field) => (
								<field.NumberField
									label="Actual Pick Time"
									description="Enter a numeric value for actual pick time"
									tooltip="Actual pick time in seconds"
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

export default UpdatePickBatchItemFormDialog;
