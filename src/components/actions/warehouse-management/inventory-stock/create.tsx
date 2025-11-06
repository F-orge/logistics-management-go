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

const CreateInventoryStockFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementInventoryStock>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInventoryStock)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("InventoryStock created successfully");
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
				open={searchParams.action === "createInventoryStock"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create InventoryStock"
				description="Tracks current inventory levels by product and location with batch/lot information, reservation tracking, and movement history"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product this stock record is for"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="location">
							{(field) => (
								<field.TextField
									label="Location"
									description="The warehouse location where this stock is stored"
									tooltip="e.g., 'LOC-001', 'Bin A5'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Stock</FieldSeparator>

					{/* Stock */}
					<FieldGroup>
						<FieldLegend>Stock</FieldLegend>
						<FieldDescription>Manage stock information</FieldDescription>

						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="The current quantity on hand"
									tooltip="e.g., 50, 100, 500"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="reservedQuantity">
							{(field) => (
								<field.NumberField
									label="Reserved Quantity"
									description="Quantity reserved for pending orders"
									tooltip="e.g., 10, 25, 50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Batch Information</FieldSeparator>

					{/* Batch Information */}
					<FieldGroup>
						<FieldLegend>Batch Information</FieldLegend>
						<FieldDescription>
							Manage batch information information
						</FieldDescription>

						<form.AppField name="batch">
							{(field) => (
								<field.TextField
									label="Batch"
									description="Batch or lot number of the stock"
									tooltip="e.g., 'BATCH-2024-001', 'LOT123'"
									placeholder=""
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
									description="The status of this inventory"
									tooltip="e.g., 'on-hand', 'allocated', 'reserved'"
									options={[
										{ label: "On Hand", value: "on-hand" },
										{ label: "Allocated", value: "allocated" },
										{ label: "Reserved", value: "reserved" },
										{ label: "Damaged", value: "damaged" },
										{ label: "Expired", value: "expired" },
										{ label: "Quarantined", value: "quarantined" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Tracking</FieldSeparator>

					{/* Tracking */}
					<FieldGroup>
						<FieldLegend>Tracking</FieldLegend>
						<FieldDescription>Manage tracking information</FieldDescription>

						<form.AppField name="lastMovementAt">
							{(field) => (
								<field.DateTimeField
									label="Last Movement At"
									description="Timestamp of the last stock movement"
									tooltip="e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="lastCountedAt">
							{(field) => (
								<field.DateTimeField
									label="Last Counted At"
									description="Timestamp of the last inventory count"
									tooltip="e.g., 01/10/2024, 01/31/2024"
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

export default CreateInventoryStockFormDialog;
