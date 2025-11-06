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
				description="Fill out the form to create a new Accounttransaction"
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
									description="Enter clientaccount"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="referenceNumber">
							{(field) => (
								<field.TextField
									label="Reference Number"
									description="Enter referencenumber"
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
									description="Enter number"
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
									description="Select an option"
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
									description="Enter processedby"
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
									description="Select date"
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
									description="Enter number"
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
