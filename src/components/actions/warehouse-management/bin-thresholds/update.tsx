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

const UpdateBinThresholdFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.WarehouseManagementBinThreshold, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementBinThreshold)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.WarehouseManagementBinThreshold>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementBinThreshold)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("BinThreshold updated successfully");
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
				open={searchParams.action === "updateBinThreshold"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update BinThreshold"
				description="Sets minimum/maximum quantity thresholds and reorder points for products in specific locations to maintain optimal stock levels"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="location">
							{(field) => (
								<field.TextField
									label="Location"
									description="The bin or location this threshold applies to"
									tooltip="e.g., 'LOC-001', 'Bin A5'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product this threshold is for"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Thresholds</FieldSeparator>

					{/* Thresholds */}
					<FieldGroup>
						<FieldLegend>Thresholds</FieldLegend>
						<FieldDescription>Manage thresholds information</FieldDescription>

						<form.AppField name="minQuantity">
							{(field) => (
								<field.NumberField
									label="Min Quantity"
									description="Minimum quantity before alert"
									tooltip="e.g., 10, 25, 50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxQuantity">
							{(field) => (
								<field.NumberField
									label="Max Quantity"
									description="Maximum quantity allowed in this bin"
									tooltip="e.g., 100, 250, 500"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Replenishment</FieldSeparator>

					{/* Replenishment */}
					<FieldGroup>
						<FieldLegend>Replenishment</FieldLegend>
						<FieldDescription>
							Manage replenishment information
						</FieldDescription>

						<form.AppField name="reorderQuantity">
							{(field) => (
								<field.NumberField
									label="Reorder Quantity"
									description="Quantity to reorder when stock falls below minimum"
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

export default UpdateBinThresholdFormDialog;
