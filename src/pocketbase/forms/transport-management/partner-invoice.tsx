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
	Collections,
	Create,
	TransportManagementCarriersResponse,
	TransportManagementPartnerInvoiceItemsResponse,
	TransportManagementPartnerInvoiceRecord,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementPartnerInvoiceSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementPartnerInvoiceSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementPartnerInvoice>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementPartnerInvoice)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `PartnerInvoice created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementPartnerInvoiceRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.TransportManagementPartnerInvoice>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementPartnerInvoice)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "PartnerInvoice updated successfully",
				})
				.unwrap();
		},
	});

export const PartnerInvoiceForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementPartnerInvoice>
		| Update<Collections.TransportManagementPartnerInvoice>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Carrier */}
					<FieldGroup>
						<FieldLegend>Carrier</FieldLegend>
						<FieldDescription>Manage carrier information</FieldDescription>

						<form.AppField name="carrier">
							{(field) => (
								<field.RelationField<TransportManagementCarriersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.TransportManagementCarriers}
									relationshipName="carrier"
									label="Carrier"
									description="Associated carrier"
									displayField="name"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

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
									description="Partner invoice number"
									placeholder=""
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

						<form.AppField name="invoiceDate">
							{(field) => (
								<field.DateTimeField
									label="Invoice Date"
									description="Invoice date"
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

						<form.AppField name="totalAmount">
							{(field) => (
								<field.NumberField
									label="Total Amount"
									description="Total invoice amount"
									placeholder="0"
									min={0}
									required
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
									description="Payment status"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Paid", value: "paid" },
										{ label: "Disputed", value: "disputed" },
										{ label: "Overdue", value: "overdue" },
										{ label: "Cancelled", value: "cancelled" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Items */}
					<FieldGroup>
						<FieldLegend>Items</FieldLegend>
						<FieldDescription>Manage items information</FieldDescription>

						<form.AppField name="items">
							{(field) => (
								<field.RelationField<TransportManagementPartnerInvoiceItemsResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.TransportManagementPartnerInvoiceItems
									}
									relationshipName="items"
									label="Items"
									description="Line items on invoice"
									displayField="id"
									recordListOption={{}}
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
				<PartnerInvoiceForm form={form as any} />
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
		queryKey: ["partnerinvoice", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementPartnerInvoice)
				.getOne<TransportManagementPartnerInvoiceRecord>(searchQuery.id!),
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
				<PartnerInvoiceForm form={form as any} />
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
