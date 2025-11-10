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
	BillingManagementCreditNotesRecord,
	BillingManagementDisputesResponse,
	BillingManagementInvoicesResponse,
	Collections,
	Create,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { BillingManagementCreditNotesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementCreditNotesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.BillingManagementCreditNotes>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementCreditNotes)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `CreditNotes created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: BillingManagementCreditNotesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.BillingManagementCreditNotes>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementCreditNotes)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "CreditNotes updated successfully",
				})
				.unwrap();
		},
	});

export const CreditNotesForm = withForm({
	defaultValues: {} as
		| Create<Collections.BillingManagementCreditNotes>
		| Update<Collections.BillingManagementCreditNotes>,
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

						<form.AppField name="creditNoteNumber">
							{(field) => (
								<field.TextField
									label="Credit Note Number"
									description="Unique credit note number"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="dispute">
							{(field) => (
								<field.RelationField<BillingManagementDisputesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.BillingManagementDisputes}
									relationshipName="dispute"
									label="Dispute"
									description="Related dispute"
									displayField="id"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
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
									required
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
									description="Date when credit note was issued"
									placeholder=""
									required
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
									description="Credit note amount"
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
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="reason">
							{(field) => (
								<field.TextareaField
									label="Reason"
									description="Reason for credit note"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
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

					{/* Tracking */}
					<FieldGroup>
						<FieldLegend>Tracking</FieldLegend>
						<FieldDescription>Manage tracking information</FieldDescription>

						<form.AppField name="appliedAt">
							{(field) => (
								<field.DateTimeField
									label="Applied At"
									description="Date when credit was applied"
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
				<CreditNotesForm form={form as any} />
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
		queryKey: ["creditnotes", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementCreditNotes)
				.getOne<BillingManagementCreditNotesRecord>(searchQuery.id!),
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
				<CreditNotesForm form={form as any} />
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
