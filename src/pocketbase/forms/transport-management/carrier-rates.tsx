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
	TransportManagementCarrierRatesRecord,
	TransportManagementCarriersResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementCarrierRatesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementCarrierRatesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementCarrierRates>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementCarrierRates)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `CarrierRates created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementCarrierRatesRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.TransportManagementCarrierRates>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementCarrierRates)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "CarrierRates updated successfully",
				})
				.unwrap();
		},
	});

export const CarrierRatesForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementCarrierRates>
		| Update<Collections.TransportManagementCarrierRates>,
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
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Route */}
					<FieldGroup>
						<FieldLegend>Route</FieldLegend>
						<FieldDescription>Manage route information</FieldDescription>

						<form.AppField name="origin">
							{(field) => (
								<field.TextField
									label="Origin"
									description="Origin location"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="destination">
							{(field) => (
								<field.TextField
									label="Destination"
									description="Destination location"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Pricing */}
					<FieldGroup>
						<FieldLegend>Pricing</FieldLegend>
						<FieldDescription>Manage pricing information</FieldDescription>

						<form.AppField name="rate">
							{(field) => (
								<field.NumberField
									label="Rate"
									description="Shipping rate"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="unit">
							{(field) => (
								<field.SelectField
									label="Unit"
									description="Unit for rate calculation"
									options={[
										{ label: "Per-kg", value: "per-kg" },
										{ label: "Per-container", value: "per-container" },
										{ label: "Per-mile", value: "per-mile" },
										{ label: "Per-km", value: "per-km" },
										{ label: "Flat-rate", value: "flat-rate" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Service */}
					<FieldGroup>
						<FieldLegend>Service</FieldLegend>
						<FieldDescription>Manage service information</FieldDescription>

						<form.AppField name="serviceType">
							{(field) => (
								<field.TextField
									label="Service Type"
									description="Type of service"
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
				<CarrierRatesForm form={form as any} />
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
		queryKey: ["carrierrates", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementCarrierRates)
				.getOne<TransportManagementCarrierRatesRecord>(searchQuery.id!),
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
				<CarrierRatesForm form={form as any} />
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
