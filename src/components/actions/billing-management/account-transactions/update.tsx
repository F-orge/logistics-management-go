import { useQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useParams,
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
import { Collections, Update } from "@/lib/pb.types";

const UpdateAccountTransactionFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [
			Collections.BillingManagementAccountTransactions,
			searchParams.id,
		],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementAccountTransactions)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.BillingManagementAccountTransactions>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementAccountTransactions)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("AccountTransaction updated successfully");
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
				open={searchParams.action === "updateAccountTransaction"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update AccountTransaction"
				description="Edit Accounttransaction information"
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

export default UpdateAccountTransactionFormDialog;
