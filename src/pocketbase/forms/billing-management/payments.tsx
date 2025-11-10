import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import {
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
	BillingManagementInvoicesResponse,
	BillingManagementPaymentsRecord,
	Collections,
	Create,
	TypedPocketBase,
	Update,
	UsersResponse,
} from "@/lib/pb.types";
import { BillingManagementPaymentsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementPaymentsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.BillingManagementPayments>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementPayments)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Payments created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: BillingManagementPaymentsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.BillingManagementPayments>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementPayments)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Payments updated successfully",
				})
				.unwrap();
		},
	});

export const PaymentsForm = withForm({
	defaultValues: {} as
		| Create<Collections.BillingManagementPayments>
		| Update<Collections.BillingManagementPayments>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="invoice">
							{(field) => (
								<field.RelationField<BillingManagementInvoicesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.BillingManagementInvoices}
									relationshipName="invoice"
									label="Invoice"
									description="Related invoice"
									displayField="invoiceNumber"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Amount */}
					<FieldGroup>
						<FieldLegend>Amount</FieldLegend>
						<FieldDescription>Manage amount information</FieldDescription>

						<form.AppField name="amount">
							{(field) => (
								<field.NumberField
									label="Amount"
									description="Payment amount"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="currency">
							{(field) => (
								<field.TextField
									label="Currency"
									description="Currency code"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="fees">
							{(field) => (
								<field.NumberField
									label="Fees"
									description="Processing fees"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="netAmount">
							{(field) => (
								<field.NumberField
									label="Net Amount"
									description="Amount after fees"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Method */}
					<FieldGroup>
						<FieldLegend>Method</FieldLegend>
						<FieldDescription>Manage method information</FieldDescription>

						<form.AppField name="paymentMethod">
							{(field) => (
								<field.SelectField
									label="Payment Method"
									description="How payment was made"
									options={[
										{ label: "Credit-card", value: "credit-card" },
										{ label: "Debit-card", value: "debit-card" },
										{ label: "Wallet", value: "wallet" },
										{ label: "Qr-ph", value: "qr-ph" },
										{ label: "Client-credit", value: "client-credit" },
										{ label: "Bank-transfer", value: "bank-transfer" },
										{ label: "Cash", value: "cash" },
										{ label: "Check", value: "check" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Current payment status"
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

					<FieldSeparator> </FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="paymentDate">
							{(field) => (
								<field.DateTimeField
									label="Payment Date"
									description="Date of payment"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="processedAt">
							{(field) => (
								<field.DateTimeField
									label="Processed At"
									description="When payment was processed"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Processing */}
					<FieldGroup>
						<FieldLegend>Processing</FieldLegend>
						<FieldDescription>Manage processing information</FieldDescription>

						<form.AppField name="processedBy">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Users}
									relationshipName="processedBy"
									label="Processed By"
									description="User who processed payment"
									displayField="username"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Gateway */}
					<FieldGroup>
						<FieldLegend>Gateway</FieldLegend>
						<FieldDescription>Manage gateway information</FieldDescription>

						<form.AppField name="transactionId">
							{(field) => (
								<field.TextField
									label="Transaction Id"
									description="External transaction ID"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="gatewayReferenceId">
							{(field) => (
								<field.TextField
									label="Gateway Reference Id"
									description="Payment gateway reference"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Additional notes"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Evidence */}
					<FieldGroup>
						<FieldLegend>Evidence</FieldLegend>
						<FieldDescription>Manage evidence information</FieldDescription>

						<form.AppField name="attachments">
							{(field) => (
								<field.TextField
									label="Attachments"
									description="Payment proof documents"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</form.AppForm>
		);
	},
});

const CreateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const form = useAppForm(CreateFormOptionFactory(pocketbase));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<PaymentsForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

const UpdateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data: record } = useSuspenseQuery({
		queryKey: ["payments", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementPayments)
				.getOne<BillingManagementPaymentsRecord>(searchQuery.id!),
	});

	const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<PaymentsForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

export default () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	switch (searchQuery.action) {
		case "create":
			return <CreateForm />;
		case "update":
			return <UpdateForm />;
		default:
			return null;
	}
};
