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
	CustomerRelationsContactsResponse,
	CustomerRelationsInteractionsRecord,
	TypedPocketBase,
	Update,
	UsersResponse,
} from "@/lib/pb.types";
import { CustomerRelationsInteractionsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsInteractionsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.CustomerRelationsInteractions>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsInteractions)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Interactions created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: CustomerRelationsInteractionsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.CustomerRelationsInteractions>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsInteractions)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Interactions updated successfully",
				})
				.unwrap();
		},
	});

export const InteractionsForm = withForm({
	defaultValues: {} as
		| Create<Collections.CustomerRelationsInteractions>
		| Update<Collections.CustomerRelationsInteractions>,
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

						<form.AppField name="contact">
							{(field) => (
								<field.RelationField<CustomerRelationsContactsResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.Collections.CustomerRelationsContacts
									}
									relationshipName="contact"
									label="Contact"
									description="Contact involved in this interaction"
									displayField="name"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Interaction Type */}
					<FieldGroup>
						<FieldLegend>Interaction Type</FieldLegend>
						<FieldDescription>
							Manage interaction type information
						</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="How the interaction occurred"
									options={[
										{ label: "Call", value: "call" },
										{ label: "Meeting", value: "meeting" },
										{ label: "Email", value: "email" },
										{ label: "Text", value: "text" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="interactionDate">
							{(field) => (
								<field.DateTimeField
									label="Interaction Date"
									description="Date and time of interaction"
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

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Detailed notes about the interaction"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Results */}
					<FieldGroup>
						<FieldLegend>Results</FieldLegend>
						<FieldDescription>Manage results information</FieldDescription>

						<form.AppField name="outcome">
							{(field) => (
								<field.TextField
									label="Outcome"
									description="Outcome or result of interaction"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Ownership */}
					<FieldGroup>
						<FieldLegend>Ownership</FieldLegend>
						<FieldDescription>Manage ownership information</FieldDescription>

						<form.AppField name="user">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Collections.Users}
									relationshipName="user"
									label="User"
									description="User who recorded this interaction"
									displayField="name"
									recordListOption={{}}
									required
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
				<InteractionsForm form={form as any} />
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
		queryKey: ["interactions", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsInteractions)
				.getOne<CustomerRelationsInteractionsRecord>(searchQuery.id!),
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
				<InteractionsForm form={form as any} />
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
