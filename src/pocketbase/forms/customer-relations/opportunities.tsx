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
	CustomerRelationsContactsResponse,
	CustomerRelationsOpportunitiesRecord,
	TypedPocketBase,
	Update,
	UsersResponse,
} from "@/lib/pb.types";
import { CustomerRelationsOpportunitiesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsOpportunitiesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.CustomerRelationsOpportunities>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsOpportunities)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Opportunities created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: CustomerRelationsOpportunitiesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.CustomerRelationsOpportunities>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsOpportunities)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Opportunities updated successfully",
				})
				.unwrap();
		},
	});

export const OpportunitiesForm = withForm({
	defaultValues: {} as
		| Create<Collections.CustomerRelationsOpportunities>
		| Update<Collections.CustomerRelationsOpportunities>,
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
									description="Opportunity name"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Related Records */}
					<FieldGroup>
						<FieldLegend>Related Records</FieldLegend>
						<FieldDescription>
							Manage related records information
						</FieldDescription>

						<form.AppField name="company">
							{(field) => (
								<field.RelationField<CustomerRelationsCompaniesResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.Collections.CustomerRelationsCompanies
									}
									relationshipName="company"
									label="Company"
									description="Company associated with this opportunity"
									displayField="name"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="contact">
							{(field) => (
								<field.RelationField<CustomerRelationsContactsResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.Collections.CustomerRelationsContacts
									}
									relationshipName="contact"
									label="Contact"
									description="Primary contact for this opportunity"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Financials */}
					<FieldGroup>
						<FieldLegend>Financials</FieldLegend>
						<FieldDescription>Manage financials information</FieldDescription>

						<form.AppField name="dealValue">
							{(field) => (
								<field.NumberField
									label="Deal Value"
									description="Estimated deal value"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Pipeline */}
					<FieldGroup>
						<FieldLegend>Pipeline</FieldLegend>
						<FieldDescription>Manage pipeline information</FieldDescription>

						<form.AppField name="stage">
							{(field) => (
								<field.SelectField
									label="Stage"
									description="Where in the sales pipeline this opportunity is"
									options={[
										{ label: "Prospecting", value: "prospecting" },
										{ label: "Qualification", value: "qualification" },
										{ label: "Need-analysis", value: "need-analysis" },
										{ label: "Demo", value: "demo" },
										{ label: "Proposal", value: "proposal" },
										{ label: "Negotiation", value: "negotiation" },
										{ label: "Closed-won", value: "closed-won" },
										{ label: "Closed-lost", value: "closed-lost" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Forecast */}
					<FieldGroup>
						<FieldLegend>Forecast</FieldLegend>
						<FieldDescription>Manage forecast information</FieldDescription>

						<form.AppField name="probability">
							{(field) => (
								<field.NumberField
									label="Probability"
									description="Probability of closing (0-100)"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Source */}
					<FieldGroup>
						<FieldLegend>Source</FieldLegend>
						<FieldDescription>Manage source information</FieldDescription>

						<form.AppField name="source">
							{(field) => (
								<field.SelectField
									label="Source"
									description="Source of the opportunity"
									options={[
										{ label: "Website", value: "website" },
										{ label: "Referral", value: "referral" },
										{ label: "Social-media", value: "social-media" },
										{ label: "Email-campaign", value: "email-campaign" },
										{ label: "Cold-call", value: "cold-call" },
										{ label: "Event", value: "event" },
										{ label: "Advertisement", value: "advertisement" },
										{ label: "Partner", value: "partner" },
										{ label: "Existing-customer", value: "existing-customer" },
										{ label: "Other", value: "other" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Timeline */}
					<FieldGroup>
						<FieldLegend>Timeline</FieldLegend>
						<FieldDescription>Manage timeline information</FieldDescription>

						<form.AppField name="expectedCloseDate">
							{(field) => (
								<field.DateTimeField
									label="Expected Close Date"
									description="Expected close date"
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

						<form.AppField name="owner">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Collections.Users}
									relationshipName="owner"
									label="Owner"
									description="Sales representative owner"
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
				<OpportunitiesForm form={form as any} />
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
		queryKey: ["opportunities", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsOpportunities)
				.getOne<CustomerRelationsOpportunitiesRecord>(searchQuery.id!),
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
				<OpportunitiesForm form={form as any} />
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
