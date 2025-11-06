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

const CreateInvoiceLineItemFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.BillingManagementInvoiceLineItems>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementInvoiceLineItems)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("InvoiceLineItem created successfully");
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
				open={searchParams.action === "createInvoiceLineItem"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create InvoiceLineItem"
				description="Line items for invoices with service descriptions, quantities, rates, and amount calculations"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="invoice">
							{(field) => (
								<field.TextField
									label="Invoice"
									description="The invoice this line item belongs to"
									tooltip="e.g., 'INV-2024-001', 'BL-789'"
									placeholder=""
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
									description="Description of the service or product being charged"
									tooltip="e.g., 'Ground Shipping - 50kg package', 'Customs Brokerage Fee'"
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

						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="The number of units or quantity of service"
									tooltip="e.g., 1, 10, 100.5"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Pricing</FieldSeparator>

					{/* Pricing */}
					<FieldGroup>
						<FieldLegend>Pricing</FieldLegend>
						<FieldDescription>Manage pricing information</FieldDescription>

						<form.AppField name="unitPrice">
							{(field) => (
								<field.NumberField
									label="Unit Price"
									description="The price per unit or per service"
									tooltip="e.g., 25.50, 100, 1500.00"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Discount</FieldSeparator>

					{/* Discount */}
					<FieldGroup>
						<FieldLegend>Discount</FieldLegend>
						<FieldDescription>Manage discount information</FieldDescription>

						<form.AppField name="discountRate">
							{(field) => (
								<field.NumberField
									label="Discount Rate"
									description="Discount percentage applied to this line item"
									tooltip="e.g., 5, 10, 15 (as percentage)"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="discountAmount">
							{(field) => (
								<field.NumberField
									label="Discount Amount"
									description="The discount amount deducted from this line"
									tooltip="e.g., 25, 100, 500.50"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Tax</FieldSeparator>

					{/* Tax */}
					<FieldGroup>
						<FieldLegend>Tax</FieldLegend>
						<FieldDescription>Manage tax information</FieldDescription>

						<form.AppField name="taxRate">
							{(field) => (
								<field.NumberField
									label="Tax Rate"
									description="Tax percentage applied to this line item"
									tooltip="e.g., 5, 10, 15, 12.5 (as percentage)"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="taxAmount">
							{(field) => (
								<field.NumberField
									label="Tax Amount"
									description="The calculated tax amount for this line item"
									tooltip="e.g., 50, 150, 1000.00"
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

export default CreateInvoiceLineItemFormDialog;
