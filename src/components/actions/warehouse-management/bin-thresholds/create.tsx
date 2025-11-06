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

const CreateBinThresholdFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementBinThreshold>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementBinThreshold)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("BinThreshold created successfully");
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
				open={searchParams.action === "createBinThreshold"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create BinThreshold"
				description="Fill out the form to create a new Binthreshold"
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
									description="Enter location"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="Enter product"
									placeholder=""
									required
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
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxQuantity">
							{(field) => (
								<field.NumberField
									label="Max Quantity"
									description="Enter number"
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
									description="Enter number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Alerts</FieldSeparator>

					{/* Alerts */}
					<FieldGroup>
						<FieldLegend>Alerts</FieldLegend>
						<FieldDescription>Manage alerts information</FieldDescription>

						<form.AppField name="alertThreshold">
							{(field) => (
								<field.NumberField
									label="Alert Threshold"
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

						<form.AppField name="isActive">
							{(field) => (
								<field.TextField
									label="Is Active"
									description="Enter isactive"
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

export default CreateBinThresholdFormDialog;
