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
	BillingManagementSurchargesRecord,
	Collections,
	Create,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { BillingManagementSurchargesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementSurchargesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.BillingManagementSurcharges>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementSurcharges)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Surcharges created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: BillingManagementSurchargesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.BillingManagementSurcharges>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.BillingManagementSurcharges)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Surcharges updated successfully",
				})
				.unwrap();
		},
	});

export const SurchargesForm = withForm({
	defaultValues: {} as
		| Create<Collections.BillingManagementSurcharges>
		| Update<Collections.BillingManagementSurcharges>,
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
									description="A descriptive name for this surcharge"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Calculation */}
					<FieldGroup>
						<FieldLegend>Calculation</FieldLegend>
						<FieldDescription>Manage calculation information</FieldDescription>

						<form.AppField name="calculationMethod">
							{(field) => (
								<field.SelectField
									label="Calculation Method"
									description="The method used to calculate the surcharge amount"
									options={[
										{ label: "Percentage", value: "percentage" },
										{ label: "Fixed", value: "fixed" },
										{ label: "Per-unit", value: "per-unit" },
										{ label: "Sliding-scale", value: "sliding-scale" },
									]}
									placeholder="Select..."
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
									description="The fixed surcharge amount (for fixed calculation method)"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="isActive">
							{(field) => (
								<field.TextField
									label="Is Active"
									description="Mark whether this surcharge is currently being applied"
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

						<form.AppField name="description">
							{(field) => (
								<field.TextareaField
									label="Description"
									description="Detailed explanation of when and why this surcharge is applied"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Validity */}
					<FieldGroup>
						<FieldLegend>Validity</FieldLegend>
						<FieldDescription>Manage validity information</FieldDescription>

						<form.AppField name="validFrom">
							{(field) => (
								<field.DateTimeField
									label="Valid From"
									description="The start date when this surcharge becomes effective"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="validTo">
							{(field) => (
								<field.DateTimeField
									label="Valid To"
									description="The end date when this surcharge expires or becomes inactive"
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
				<SurchargesForm form={form as any} />
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
		queryKey: ["surcharges", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.BillingManagementSurcharges)
				.getOne<BillingManagementSurchargesRecord>(searchQuery.id!),
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
				<SurchargesForm form={form as any} />
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
