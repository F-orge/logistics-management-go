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

const CreateClientAccountFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.BillingManagementClientAccounts>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.BillingManagementClientAccounts)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("ClientAccount created successfully");
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
				open={searchParams.action === "createClientAccount"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create ClientAccount"
				description="Manages client financial accounts, wallet balances, credit limits, and payment terms for each client in the system"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Manage basic information information
						</FieldDescription>

						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="Select the client associated with this account"
									tooltip="e.g., 'Client ABC Inc', 'Enterprise Solutions Ltd'"
									placeholder=""
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

						<form.AppField name="walletBalance">
							{(field) => (
								<field.NumberField
									label="Wallet Balance"
									description="The current balance available in this client's wallet account"
									tooltip="e.g., 1000.50, 5000, 10000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Credit Management</FieldSeparator>

					{/* Credit Management */}
					<FieldGroup>
						<FieldLegend>Credit Management</FieldLegend>
						<FieldDescription>
							Manage credit management information
						</FieldDescription>

						<form.AppField name="creditLimit">
							{(field) => (
								<field.NumberField
									label="Credit Limit"
									description="The maximum amount of credit this client is allowed to use"
									tooltip="e.g., 50000, 100000, 500000"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="isCreditApproved">
							{(field) => (
								<field.TextField
									label="Is Credit Approved"
									description="Indicates whether credit facilities have been approved for this client"
									tooltip="e.g., 'yes', 'no', 'true', 'false'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Payment Terms</FieldSeparator>

					{/* Payment Terms */}
					<FieldGroup>
						<FieldLegend>Payment Terms</FieldLegend>
						<FieldDescription>
							Manage payment terms information
						</FieldDescription>

						<form.AppField name="paymentTermsDays">
							{(field) => (
								<field.NumberField
									label="Payment Terms Days"
									description="Number of days from invoice date that payment is due"
									tooltip="e.g., 30, 60, 90"
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

export default CreateClientAccountFormDialog;
