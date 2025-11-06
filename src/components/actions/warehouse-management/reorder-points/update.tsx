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

const UpdateReorderPointFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.WarehouseManagementReorderPoints, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementReorderPoints)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementReorderPoints>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementReorderPoints)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("ReorderPoint updated successfully");
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
				open={searchParams.action === "updateReorderPoint"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update ReorderPoint"
				description="Sets minimum quantity thresholds for products in each warehouse to trigger automatic reordering"
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
									description="The warehouse for this reorder point"
									tooltip="e.g., 'WH-001', 'Manila Warehouse'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product to monitor"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Threshold</FieldSeparator>

					{/* Threshold */}
					<FieldGroup>
						<FieldLegend>Threshold</FieldLegend>
						<FieldDescription>Manage threshold information</FieldDescription>

						<form.AppField name="threshold">
							{(field) => (
								<field.NumberField
									label="Threshold"
									description="Minimum quantity that triggers reordering"
									tooltip="e.g., 50, 100, 200"
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

export default UpdateReorderPointFormDialog;
