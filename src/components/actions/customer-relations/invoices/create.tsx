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
		defaultValues: {} as Create<Collections.CustomerRelationsInvoices>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsInvoices)
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
				description="Records customer invoices with status tracking, payment terms, discounts, taxes, and notes"
			>
				<FieldSet>
					{/* Relationships */}
					<FieldGroup>
						<FieldLegend>Relationships</FieldLegend>
						<FieldDescription>
							Manage relationships information
						</FieldDescription>

						<form.AppField name="opportunity">
							{(field) => (
								<field.TextField
									label="Opportunity"
									description="Related sales opportunity"
									tooltip="e.g., 'OPP-001', 'Enterprise Deal'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Timeline</FieldSeparator>

					{/* Timeline */}
					<FieldGroup>
						<FieldLegend>Timeline</FieldLegend>
						<FieldDescription>Manage timeline information</FieldDescription>

						<form.AppField name="issueDate">
							{(field) => (
								<field.DateTimeField
									label="Issue Date"
									description="Date when invoice was issued"
									tooltip="e.g., 01/15/2024, 02/01/2024"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="dueDate">
							{(field) => (
								<field.DateTimeField
									label="Due Date"
									description="Payment due date"
									tooltip="e.g., 02/15/2024, 03/01/2024"
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
									description="Current status of the invoice"
									tooltip="e.g., 'draft', 'sent', 'paid'"
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
									required
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
									description="Currency code for the invoice"
									tooltip="e.g., 'USD', 'EUR', 'PHP'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="subtotal">
							{(field) => (
								<field.NumberField
									label="Subtotal"
									description="Subtotal before tax or discount"
									tooltip="e.g., 1000, 5500.50, 25000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="discountAmount">
							{(field) => (
								<field.NumberField
									label="Discount Amount"
									description="Total discount amount"
									tooltip="e.g., 100, 500, 2500"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="totalAmount">
							{(field) => (
								<field.NumberField
									label="Total Amount"
									description="Total amount due"
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
									description="Additional invoice notes or messages"
									tooltip="e.g., 'Thank you for your business'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="paymentTerms">
							{(field) => (
								<field.TextareaField
									label="Payment Terms"
									description="Payment terms and conditions"
									tooltip="e.g., 'Net 30', '50% upfront, 50% on delivery'"
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
