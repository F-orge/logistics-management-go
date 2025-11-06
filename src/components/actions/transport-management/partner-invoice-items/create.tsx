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

const CreatePartnerInvoiceItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues:
			{} as Create<Collections.TransportManagementPartnerInvoiceItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.TransportManagementPartnerInvoiceItems)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("PartnerInvoiceItem created successfully");
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
				open={searchParams.action === "createPartnerInvoiceItem"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create PartnerInvoiceItem"
				description="Individual line items on partner invoices detailing charges for specific shipment legs"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="partnerInvoice">
							{(field) => (
								<field.TextField
									label="Partner Invoice"
									description="The partner invoice this item belongs to"
									tooltip="e.g., 'PINV-001', 'DHL-INV-2024-001'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="shipmentLeg">
							{(field) => (
								<field.TextField
									label="Shipment Leg"
									description="The shipment leg being charged for"
									tooltip="e.g., 'LEG-001', 'SLP-2024-001'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Amount</FieldSeparator>

					{/* Amount */}
					<FieldGroup>
						<FieldLegend>Amount</FieldLegend>
						<FieldDescription>Manage amount information</FieldDescription>

						<form.AppField name="amount">
							{(field) => (
								<field.NumberField
									label="Amount"
									description="The charge amount for this line item"
									tooltip="e.g., 500, 1500.50, 5000"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Details</FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="description">
							{(field) => (
								<field.TextareaField
									label="Description"
									description="Description of the service or charges"
									tooltip="e.g., 'Shipment from Manila to Cebu', 'Freight charges'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="The quantity of items or units being charged"
									tooltip="e.g., 1, 5, 10"
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

export default CreatePartnerInvoiceItemFormDialog;
