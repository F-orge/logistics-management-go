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

const CreatePaymentFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.BillingManagementPayments>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementPayments)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Payment created successfully");
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
				open={searchParams.action === "createPayment"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Payment"
				description="Logs payment transactions with method, amount, status, and gateway references for financial tracking"
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
									description="The invoice this payment is for"
									tooltip="e.g., 'INV-2024-001', 'BL-789'"
									placeholder=""
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
									description="The amount paid by the client"
									tooltip="e.g., 500, 1500.50, 10000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="netAmount">
							{(field) => (
								<field.NumberField
									label="Net Amount"
									description="The net amount received after deducting fees"
									tooltip="e.g., 490, 1450, 9900"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Dates</FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="paymentDate">
							{(field) => (
								<field.DateTimeField
									label="Payment Date"
									description="The date when payment was received"
									tooltip="e.g., 01/20/2024, 02/15/2024"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Method</FieldSeparator>

					{/* Method */}
					<FieldGroup>
						<FieldLegend>Method</FieldLegend>
						<FieldDescription>Manage method information</FieldDescription>

						<form.AppField name="paymentMethod">
							{(field) => (
								<field.SelectField
									label="Payment Method"
									description="The method used to make this payment"
									tooltip="e.g., credit-card, bank-transfer, wallet, cash"
									options={[
										{ label: "Credit Card", value: "credit-card" },
										{ label: "Debit Card", value: "debit-card" },
										{ label: "Wallet", value: "wallet" },
										{ label: "Qr Ph", value: "qr-ph" },
										{ label: "Client Credit", value: "client-credit" },
										{ label: "Bank Transfer", value: "bank-transfer" },
										{ label: "Cash", value: "cash" },
										{ label: "Check", value: "check" },
									]}
									placeholder="Select..."
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
									description="The current state of this payment"
									tooltip="e.g., pending, successful, failed, refunded"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Processing", value: "processing" },
										{ label: "Successful", value: "successful" },
										{ label: "Failed", value: "failed" },
										{ label: "Cancelled", value: "cancelled" },
										{ label: "Refunded", value: "refunded" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Transaction</FieldSeparator>

					{/* Transaction */}
					<FieldGroup>
						<FieldLegend>Transaction</FieldLegend>
						<FieldDescription>Manage transaction information</FieldDescription>

						<form.AppField name="transactionId">
							{(field) => (
								<field.TextField
									label="Transaction Id"
									description="Unique transaction identifier from payment processor"
									tooltip="e.g., 'TXN-123456789', 'TRANS-PHP-001'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Gateway</FieldSeparator>

					{/* Gateway */}
					<FieldGroup>
						<FieldLegend>Gateway</FieldLegend>
						<FieldDescription>Manage gateway information</FieldDescription>

						<form.AppField name="gatewayReferenceId">
							{(field) => (
								<field.TextField
									label="Gateway Reference Id"
									description="Reference ID provided by the payment gateway"
									tooltip="e.g., 'GWAY-456789', 'PG-REF-123'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Currency</FieldSeparator>

					{/* Currency */}
					<FieldGroup>
						<FieldLegend>Currency</FieldLegend>
						<FieldDescription>Manage currency information</FieldDescription>

						<form.AppField name="currency">
							{(field) => (
								<field.TextField
									label="Currency"
									description="The currency in which payment was made"
									tooltip="e.g., 'PHP', 'USD', 'EUR'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Fees</FieldSeparator>

					{/* Fees */}
					<FieldGroup>
						<FieldLegend>Fees</FieldLegend>
						<FieldDescription>Manage fees information</FieldDescription>

						<form.AppField name="fees">
							{(field) => (
								<field.NumberField
									label="Fees"
									description="Processing or transaction fees charged for this payment"
									tooltip="e.g., 10, 50.50, 100"
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
									description="Any additional notes or details about this payment"
									tooltip="e.g., 'Early payment discount applied', 'Partial payment'"
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

export default CreatePaymentFormDialog;
