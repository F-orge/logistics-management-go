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

const CreateOutboundShipmentFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues:
			{} as Create<Collections.WarehouseManagementOutboundShipments>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementOutboundShipments)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("OutboundShipment created successfully");
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
				open={searchParams.action === "createOutboundShipment"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create OutboundShipment"
				description="Records outbound shipments to customers linked to sales orders with carrier tracking information"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="salesOrder">
							{(field) => (
								<field.TextField
									label="Sales Order"
									description="The sales order this shipment fulfills"
									tooltip="e.g., 'SO-2024-001', 'ORD-789'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="warehouse">
							{(field) => (
								<field.TextField
									label="Warehouse"
									description="The warehouse shipping this order"
									tooltip="e.g., 'Manila Warehouse', 'Cebu Center'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="carrier">
							{(field) => (
								<field.TextField
									label="Carrier"
									description="The carrier handling this shipment"
									tooltip="e.g., 'DHL', 'FedEx'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Tracking</FieldSeparator>

					{/* Tracking */}
					<FieldGroup>
						<FieldLegend>Tracking</FieldLegend>
						<FieldDescription>Manage tracking information</FieldDescription>

						<form.AppField name="trackingNumber">
							{(field) => (
								<field.TextField
									label="Tracking Number"
									description="Carrier's tracking number"
									tooltip="e.g., '1234567890AB', 'TRK-2024-123'"
									placeholder=""
									required
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
									description="Current status of the outbound shipment"
									tooltip="e.g., 'pending', 'packing', 'shipped'"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Packing", value: "packing" },
										{ label: "Ready", value: "ready" },
										{ label: "Shipped", value: "shipped" },
										{ label: "Delivered", value: "delivered" },
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

export default CreateOutboundShipmentFormDialog;
