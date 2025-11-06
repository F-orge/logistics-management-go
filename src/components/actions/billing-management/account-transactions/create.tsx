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

const CreateAccountTransactionFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues:
			{} as Create<Collections.BillingManagementAccountTransactions>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementAccountTransactions)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("AccountTransaction created successfully");
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
				open={searchParams.action === "createAccountTransaction"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create AccountTransaction"
				description="Logs all financial transactions (credits, debits, top-ups, refunds, adjustments) with running balance tracking"
			>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="clientAccount">
							{(field) => (
								<field.TextField
									label="Client Account"
									description="The client account this transaction is associated with"
									tooltip="e.g., 'ACC-001', 'CLIENT-ABC-2024'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="referenceNumber">
							{(field) => (
								<field.TextField
									label="Reference Number"
									description="External reference number for tracking (invoice, PO, or check number)"
									tooltip="e.g., 'TXN-2024-12345', 'INV-789', 'PO-456'"
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
									description="The transaction amount in the account currency"
									tooltip="e.g., 100.50, 5000, 15000.75"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Transaction Details</FieldSeparator>

					{/* Transaction Details */}
					<FieldGroup>
						<FieldLegend>Transaction Details</FieldLegend>
						<FieldDescription>
							Manage transaction details information
						</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="The category of this transaction"
									tooltip="e.g., credit, debit, top-up, refund"
									options={[
										{ label: "Credit", value: "credit" },
										{ label: "Debit", value: "debit" },
										{ label: "Top Up", value: "top-up" },
										{ label: "Refund", value: "refund" },
										{ label: "Adjustment", value: "adjustment" },
										{ label: "Fee", value: "fee" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Processing</FieldSeparator>

					{/* Processing */}
					<FieldGroup>
						<FieldLegend>Processing</FieldLegend>
						<FieldDescription>Manage processing information</FieldDescription>

						<form.AppField name="processedBy">
							{(field) => (
								<field.TextField
									label="Processed By"
									description="The user or system that processed this transaction"
									tooltip="e.g., 'John Doe', 'admin@company.com'"
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

						<form.AppField name="transactionDate">
							{(field) => (
								<field.DateTimeField
									label="Transaction Date"
									description="The date when this transaction occurred"
									tooltip="e.g., 01/15/2024, 12/25/2023"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Balance</FieldSeparator>

					{/* Balance */}
					<FieldGroup>
						<FieldLegend>Balance</FieldLegend>
						<FieldDescription>Manage balance information</FieldDescription>

						<form.AppField name="runningBalance">
							{(field) => (
								<field.NumberField
									label="Running Balance"
									description="The account balance remaining after this transaction is processed"
									tooltip="e.g., 5000.50, 12000, 25000.00"
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

export default CreateAccountTransactionFormDialog;
