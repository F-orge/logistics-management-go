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

const CreateReturnItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementReturnItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementReturnItems)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("ReturnItem created successfully");
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
				open={searchParams.action === "createReturnItem"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create ReturnItem"
				description="Line items for returns tracking product, quantities, and condition assessment data"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="return">
							{(field) => (
								<field.TextField
									label="Return"
									description="The return this item belongs to"
									tooltip="e.g., 'RET-2024-001', 'RTN-789'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product being returned"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Quantity</FieldSeparator>

					{/* Quantity */}
					<FieldGroup>
						<FieldLegend>Quantity</FieldLegend>
						<FieldDescription>Manage quantity information</FieldDescription>

						<form.AppField name="quantityExpected">
							{(field) => (
								<field.NumberField
									label="Quantity Expected"
									description="Expected quantity of returned items"
									tooltip="e.g., 5, 10, 50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="quantityRecevied">
							{(field) => (
								<field.NumberField
									label="Quantity Recevied"
									description="Actual quantity received"
									tooltip="e.g., 5, 8, 10"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Condition</FieldSeparator>

					{/* Condition */}
					<FieldGroup>
						<FieldLegend>Condition</FieldLegend>
						<FieldDescription>Manage condition information</FieldDescription>

						<form.AppField name="condition">
							{(field) => (
								<field.SelectField
									label="Condition"
									description="Condition of the returned item"
									tooltip="e.g., 'new', 'used', 'damaged'"
									options={[
										{ label: "New", value: "new" },
										{ label: "Used", value: "used" },
										{ label: "Damaged", value: "damaged" },
										{ label: "Defective", value: "defective" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateReturnItemFormDialog;
