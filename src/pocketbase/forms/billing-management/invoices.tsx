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
	BillingManagementInvoicesRecord,
	BillingManagementQuotesResponse,
	Collections,
	Create,
	TypedPocketBase,
	Update,
	UsersResponse,
} from "@/lib/pb.types";
import { BillingManagementInvoicesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementInvoicesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.BillingManagementInvoices>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementInvoices)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Invoices created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: BillingManagementInvoicesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.BillingManagementInvoices>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementInvoices)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Invoices updated successfully",
				})
				.unwrap();
		},
	});

export const InvoicesForm = withForm({
	defaultValues: {} as
		| Create<Collections.BillingManagementInvoices>
		| Update<Collections.BillingManagementInvoices>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
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
									description="Unique invoice number"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="issueDate">
							{(field) => (
								<field.DateTimeField
									label="Issue Date"
									description="When invoice was issued"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="dueDate">
							{(field) => (
								<field.DateTimeField
									label="Due Date"
									description="Payment due date"
									placeholder=""
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
									description="Current invoice status"
									options={[
										{ label: "Draft", value: "draft" },
										{ label: "Sent", value: "sent" },
										{ label: "Viewed", value: "viewed" },
										{ label: "Paid", value: "paid" },
										{ label: "Partial-paid", value: "partial-paid" },
										{ label: "Past-due", value: "past-due" },
										{ label: "Disputed", value: "disputed" },
										{ label: "Cancelled", value: "cancelled" },
										{ label: "Void", value: "void" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Amounts */}
					<FieldGroup>
						<FieldLegend>Amounts</FieldLegend>
						<FieldDescription>Manage amounts information</FieldDescription>

						<form.AppField name="subtotal">
							{(field) => (
								<field.NumberField
									label="Subtotal"
									description="Subtotal before discounts and taxes"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="totalAmount">
							{(field) => (
								<field.NumberField
									label="Total Amount"
									description="Total invoice amount"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Discounts */}
					<FieldGroup>
						<FieldLegend>Discounts</FieldLegend>
						<FieldDescription>Manage discounts information</FieldDescription>

						<form.AppField name="discountAmount">
							{(field) => (
								<field.NumberField
									label="Discount Amount"
									description="Total discount"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Payment */}
					<FieldGroup>
						<FieldLegend>Payment</FieldLegend>
						<FieldDescription>Manage payment information</FieldDescription>

						<form.AppField name="amountPaid">
							{(field) => (
								<field.NumberField
									label="Amount Paid"
									description="Amount paid so far"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="paidAt">
							{(field) => (
								<field.DateTimeField
									label="Paid At"
									description="Date payment was received"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Tracking */}
					<FieldGroup>
						<FieldLegend>Tracking</FieldLegend>
						<FieldDescription>Manage tracking information</FieldDescription>

						<form.AppField name="sentAt">
							{(field) => (
								<field.DateTimeField
									label="Sent At"
									description="When invoice was sent"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Amount */}
					<FieldGroup>
						<FieldLegend>Amount</FieldLegend>
						<FieldDescription>Manage amount information</FieldDescription>

						<form.AppField name="currency">
							{(field) => (
								<field.TextField
									label="Currency"
									description="Currency code"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Terms */}
					<FieldGroup>
						<FieldLegend>Terms</FieldLegend>
						<FieldDescription>Manage terms information</FieldDescription>

						<form.AppField name="paymentTerms">
							{(field) => (
								<field.TextareaField
									label="Payment Terms"
									description="Payment terms description"
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

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="quote">
							{(field) => (
								<field.RelationField<BillingManagementQuotesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.BillingManagementQuotes}
									relationshipName="quote"
									label="Quote"
									description="Associated quote if applicable"
									displayField="quoteNumber"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Audit */}
					<FieldGroup>
						<FieldLegend>Audit</FieldLegend>
						<FieldDescription>Manage audit information</FieldDescription>

						<form.AppField name="createdBy">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Users}
									relationshipName="createdBy"
									label="Created By"
									description="User who created invoice"
									displayField="username"
									recordListOption={{}}
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
									description="Supporting documents"
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
				<InvoicesForm form={form as any} />
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
		queryKey: ["invoices", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementInvoices)
				.getOne<BillingManagementInvoicesRecord>(searchQuery.id!),
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
				<InvoicesForm form={form as any} />
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
