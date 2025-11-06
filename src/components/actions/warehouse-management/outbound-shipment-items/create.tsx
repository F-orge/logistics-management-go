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

const CreateOutboundShipmentItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues:
			{} as Create<Collections.WarehouseManagementOutboundShipmentItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementOutboundShipmentItems)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("OutboundShipmentItem created successfully");
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
				open={searchParams.action === "createOutboundShipmentItem"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create OutboundShipmentItem"
				description="Line items for outbound shipments tracking product, batch, and shipped quantities"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="outboundShipment">
							{(field) => (
								<field.TextField
									label="Outbound Shipment"
									description="The outbound shipment this item is part of"
									tooltip="e.g., 'OBS-2024-001', 'SHIP-123'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="salesOrderItem">
							{(field) => (
								<field.TextField
									label="Sales Order Item"
									description="The sales order line item being shipped"
									tooltip="e.g., 'SOI-001', 'LI-789'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.TextField
									label="Product"
									description="The product being shipped"
									tooltip="e.g., 'PROD-001', 'SKU123456'"
									placeholder=""
									required
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
									description="Batch or lot number"
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

						<form.AppField name="quantityShipped">
							{(field) => (
								<field.NumberField
									label="Quantity Shipped"
									description="Quantity shipped on this line"
									tooltip="e.g., 50, 100, 500"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateOutboundShipmentItemFormDialog;
