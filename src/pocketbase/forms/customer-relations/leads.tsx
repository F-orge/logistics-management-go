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
	CustomerRelationsCampaignsResponse,
	CustomerRelationsLeadsRecord,
	TypedPocketBase,
	Update,
	UsersResponse,
} from "@/lib/pb.types";
import { CustomerRelationsLeadsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsLeadsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.CustomerRelationsLeads>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsLeads)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Leads created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: CustomerRelationsLeadsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.CustomerRelationsLeads>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsLeads)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Leads updated successfully",
				})
				.unwrap();
		},
	});

export const LeadsForm = withForm({
	defaultValues: {} as
		| Create<Collections.CustomerRelationsLeads>
		| Update<Collections.CustomerRelationsLeads>,
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
									description="The name of the lead"
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
									description="Primary email address for contact"
									placeholder="example@email.com"
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="phoneNumber">
							{(field) => (
								<field.TextField
									label="Phone Number"
									description="Primary phone number"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Lead Qualification */}
					<FieldGroup>
						<FieldLegend>Lead Qualification</FieldLegend>
						<FieldDescription>
							Manage lead qualification information
						</FieldDescription>

						<form.AppField name="score">
							{(field) => (
								<field.NumberField
									label="Score"
									description="Lead score for prioritization"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Lead Source */}
					<FieldGroup>
						<FieldLegend>Lead Source</FieldLegend>
						<FieldDescription>Manage lead source information</FieldDescription>

						<form.AppField name="source">
							{(field) => (
								<field.SelectField
									label="Source"
									description="Source channel for this lead"
									options={[
										{ label: "Website", value: "website" },
										{ label: "Referral", value: "referral" },
										{ label: "Social-media", value: "social-media" },
										{ label: "Email-campaign", value: "email-campaign" },
										{ label: "Cold-call", value: "cold-call" },
										{ label: "Event", value: "event" },
										{ label: "Advertisement", value: "advertisement" },
										{ label: "Partner", value: "partner" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Lead Status */}
					<FieldGroup>
						<FieldLegend>Lead Status</FieldLegend>
						<FieldDescription>Manage lead status information</FieldDescription>

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Current status in the sales pipeline"
									options={[
										{ label: "New", value: "new" },
										{ label: "Contacted", value: "contacted" },
										{ label: "Qualified", value: "qualified" },
										{ label: "Unqualified", value: "unqualified" },
										{ label: "Converted", value: "converted" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Campaign */}
					<FieldGroup>
						<FieldLegend>Campaign</FieldLegend>
						<FieldDescription>Manage campaign information</FieldDescription>

						<form.AppField name="campaign">
							{(field) => (
								<field.RelationField<CustomerRelationsCampaignsResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.Collections.CustomerRelationsCampaigns
									}
									relationshipName="campaign"
									label="Campaign"
									description="Associated campaign if applicable"
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
									description="Sales representative assigned to this lead"
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
				<LeadsForm form={form as any} />
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
		queryKey: ["leads", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsLeads)
				.getOne<CustomerRelationsLeadsRecord>(searchQuery.id!),
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
				<LeadsForm form={form as any} />
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
