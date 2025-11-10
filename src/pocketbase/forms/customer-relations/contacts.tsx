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
	CustomerRelationsCompaniesResponse,
	CustomerRelationsContactsRecord,
	TypedPocketBase,
	Update,
	UsersResponse,
} from "@/lib/pb.types";
import { CustomerRelationsContactsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsContactsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.CustomerRelationsContacts>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsContacts)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Contacts created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: CustomerRelationsContactsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.CustomerRelationsContacts>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsContacts)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Contacts updated successfully",
				})
				.unwrap();
		},
	});

export const ContactsForm = withForm({
	defaultValues: {} as
		| Create<Collections.CustomerRelationsContacts>
		| Update<Collections.CustomerRelationsContacts>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Manage basic information information
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="Full name of the contact"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Contact Information */}
					<FieldGroup>
						<FieldLegend>Contact Information</FieldLegend>
						<FieldDescription>
							Manage contact information information
						</FieldDescription>

						<form.AppField name="email">
							{(field) => (
								<field.EmailField
									label="Email"
									description="Email address for contact"
									placeholder="example@email.com"
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="phoneNumber">
							{(field) => (
								<field.TextField
									label="Phone Number"
									description="Phone number for contact"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Professional Information */}
					<FieldGroup>
						<FieldLegend>Professional Information</FieldLegend>
						<FieldDescription>
							Manage professional information information
						</FieldDescription>

						<form.AppField name="jobTitle">
							{(field) => (
								<field.TextField
									label="Job Title"
									description="Job title or position"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="company">
							{(field) => (
								<field.RelationField<CustomerRelationsCompaniesResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.Collections.CustomerRelationsCompanies
									}
									relationshipName="company"
									label="Company"
									description="Associated company"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Ownership */}
					<FieldGroup>
						<FieldLegend>Ownership</FieldLegend>
						<FieldDescription>Manage ownership information</FieldDescription>

						<form.AppField name="owner">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Collections.Users}
									relationshipName="owner"
									label="Owner"
									description="Account owner or manager"
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
				<ContactsForm form={form as any} />
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
		queryKey: ["contacts", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsContacts)
				.getOne<CustomerRelationsContactsRecord>(searchQuery.id!),
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
				<ContactsForm form={form as any} />
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
