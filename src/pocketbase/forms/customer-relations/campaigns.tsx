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
	CustomerRelationsCampaignsRecord,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { CustomerRelationsCampaignsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsCampaignsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.CustomerRelationsCampaigns>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsCampaigns)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Campaigns created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: CustomerRelationsCampaignsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.CustomerRelationsCampaigns>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsCampaigns)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Campaigns updated successfully",
				})
				.unwrap();
		},
	});

export const CampaignsForm = withForm({
	defaultValues: {} as
		| Create<Collections.CustomerRelationsCampaigns>
		| Update<Collections.CustomerRelationsCampaigns>,
	render: ({ form }) => {
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
									description="Campaign name"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Financials */}
					<FieldGroup>
						<FieldLegend>Financials</FieldLegend>
						<FieldDescription>Manage financials information</FieldDescription>

						<form.AppField name="budget">
							{(field) => (
								<field.NumberField
									label="Budget"
									description="Total budget allocated for campaign"
									placeholder="0"
									min={0}
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

						<form.AppField name="startDate">
							{(field) => (
								<field.DateTimeField
									label="Start Date"
									description="Campaign start date"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="endDate">
							{(field) => (
								<field.DateTimeField
									label="End Date"
									description="Campaign end date"
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
				<CampaignsForm form={form as any} />
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
		queryKey: ["campaigns", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsCampaigns)
				.getOne<CustomerRelationsCampaignsRecord>(searchQuery.id!),
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
				<CampaignsForm form={form as any} />
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
