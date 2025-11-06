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

const CreateInvoiceFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.BillingManagementInvoices>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementInvoices)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Invoice created successfully");
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
				open={searchParams.action === "createInvoice"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Invoice"
				description="Generates billing invoices for clients with line items, tax calculations, and payment tracking"
			>
				<FieldSet>
					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="invoiceNumber">
							{(field) => (
								<field.TextField
									label="Invoice Number"
									description="Unique identifier for this invoice"
									tooltip="e.g., 'INV-2024-001', 'BL-789456'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dates</FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="issueDate">
							{(field) => (
								<field.DateTimeField
									label="Issue Date"
									description="The date when the invoice is created and sent"
									tooltip="e.g., 01/15/2024, 12/01/2023"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="dueDate">
							{(field) => (
								<field.DateTimeField
									label="Due Date"
									description="The deadline by which payment must be received"
									tooltip="e.g., 02/15/2024, 01/30/2024"
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
									description="The current state of the invoice"
									tooltip="e.g., draft, sent, paid, past-due"
									options={[
										{ label: "Draft", value: "draft" },
										{ label: "Sent", value: "sent" },
										{ label: "Viewed", value: "viewed" },
										{ label: "Paid", value: "paid" },
										{ label: "Partial Paid", value: "partial-paid" },
										{ label: "Past Due", value: "past-due" },
										{ label: "Disputed", value: "disputed" },
										{ label: "Cancelled", value: "cancelled" },
										{ label: "Void", value: "void" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Financial</FieldSeparator>

					{/* Financial */}
					<FieldGroup>
						<FieldLegend>Financial</FieldLegend>
						<FieldDescription>Manage financial information</FieldDescription>

						<form.AppField name="currency">
							{(field) => (
								<field.TextField
									label="Currency"
									description="The currency code for all amounts on this invoice"
									tooltip="e.g., 'USD', 'EUR', 'GBP', 'PHP'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="subtotal">
							{(field) => (
								<field.NumberField
									label="Subtotal"
									description="The sum of all line items before any adjustments"
									tooltip="e.g., 1000, 5500.50, 25000.75"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="discountAmount">
							{(field) => (
								<field.NumberField
									label="Discount Amount"
									description="Total discount applied to the invoice"
									tooltip="e.g., 100, 250.50, 1000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="totalAmount">
							{(field) => (
								<field.NumberField
									label="Total Amount"
									description="The final amount owed including all taxes and adjustments"
									tooltip="e.g., 1100, 6000, 28000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Additional Information</FieldSeparator>

					{/* Additional Information */}
					<FieldGroup>
						<FieldLegend>Additional Information</FieldLegend>
						<FieldDescription>
							Manage additional information information
						</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Additional information or messages for the invoice recipient"
									tooltip="e.g., 'Thank you for your business', 'Please reference invoice number in payment'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Terms</FieldSeparator>

					{/* Terms */}
					<FieldGroup>
						<FieldLegend>Terms</FieldLegend>
						<FieldDescription>Manage terms information</FieldDescription>

						<form.AppField name="paymentTerms">
							{(field) => (
								<field.TextareaField
									label="Payment Terms"
									description="Payment terms and conditions specific to this invoice"
									tooltip="e.g., 'Net 30', '50% upfront, 50% on delivery', '2/10 net 30'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Reference</FieldSeparator>

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="quote">
							{(field) => (
								<field.TextField
									label="Quote"
									description="Link to the original quote if this invoice is based on one"
									tooltip="e.g., 'QUOTE-2024-001', 'QT-456'"
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

export default CreateInvoiceFormDialog;
