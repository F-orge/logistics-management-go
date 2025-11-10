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
	CustomerRelationsOpportunitiesResponse,
	CustomerRelationsOpportunityProductsRecord,
	CustomerRelationsProductsResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { CustomerRelationsOpportunityProductsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsOpportunityProductsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues:
			{} as Create<Collections.CustomerRelationsOpportunityProducts>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsOpportunityProducts)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `OpportunityProducts created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: CustomerRelationsOpportunityProductsRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.CustomerRelationsOpportunityProducts>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.CustomerRelationsOpportunityProducts)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "OpportunityProducts updated successfully",
				})
				.unwrap();
		},
	});

export const OpportunityProductsForm = withForm({
	defaultValues: {} as
		| Create<Collections.CustomerRelationsOpportunityProducts>
		| Update<Collections.CustomerRelationsOpportunityProducts>,
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

						<form.AppField name="opportunity">
							{(field) => (
								<field.RelationField<CustomerRelationsOpportunitiesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.CustomerRelationsOpportunities}
									relationshipName="opportunity"
									label="Opportunity"
									description="Associated opportunity"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
						<form.AppField name="product">
							{(field) => (
								<field.RelationField<CustomerRelationsProductsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.CustomerRelationsProducts}
									relationshipName="product"
									label="Product"
									description="Associated product"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="quantity">
							{(field) => (
								<field.NumberField
									label="Quantity"
									description="Quantity"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="unitPrice">
							{(field) => (
								<field.NumberField
									label="Unit Price"
									description="Unit price"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Totals */}
					<FieldGroup>
						<FieldLegend>Totals</FieldLegend>
						<FieldDescription>Manage totals information</FieldDescription>

						<form.AppField name="total">
							{(field) => (
								<field.NumberField
									label="Total"
									description="Total amount"
									placeholder="0"
									min={0}
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
				<OpportunityProductsForm form={form as any} />
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
		queryKey: ["opportunityproducts", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsOpportunityProducts)
				.getOne<CustomerRelationsOpportunityProductsRecord>(searchQuery.id!),
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
				<OpportunityProductsForm form={form as any} />
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
