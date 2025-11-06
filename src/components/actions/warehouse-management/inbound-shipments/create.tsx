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

const CreateInboundShipmentFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues:
			{} as Create<Collections.WarehouseManagementInboundShipments>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInboundShipments)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("InboundShipment created successfully");
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
				open={searchParams.action === "createInboundShipment"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create InboundShipment"
				description="Records inbound shipments from suppliers with tracking numbers, expected dates, and receipt status"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="The supplier or source of this inbound shipment"
									tooltip="e.g., 'Supplier Inc', 'Wholesale Distributor'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="warehouse">
							{(field) => (
								<field.TextField
									label="Warehouse"
									description="The warehouse receiving this shipment"
									tooltip="e.g., 'Manila Warehouse', 'Cebu Center'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dates</FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="expectedArrivalDate">
							{(field) => (
								<field.DateTimeField
									label="Expected Arrival Date"
									description="Expected arrival date"
									tooltip="e.g., 01/15/2024, 02/01/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="actualArrivalDate">
							{(field) => (
								<field.DateTimeField
									label="Actual Arrival Date"
									description="Actual arrival date when shipment was received"
									tooltip="e.g., 01/14/2024, 02/02/2024"
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
									description="Current status of the inbound shipment"
									tooltip="e.g., 'pending', 'in-transit', 'received'"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "In Transit", value: "in-transit" },
										{ label: "Received", value: "received" },
										{ label: "Processing", value: "processing" },
										{ label: "Completed", value: "completed" },
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

export default CreateInboundShipmentFormDialog;
