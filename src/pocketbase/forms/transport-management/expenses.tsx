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
	TransportManagementDriversResponse,
	TransportManagementExpensesRecord,
	TransportManagementTripsResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementExpensesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementExpensesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementExpenses>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementExpenses)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Expenses created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementExpensesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.TransportManagementExpenses>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementExpenses)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Expenses updated successfully",
				})
				.unwrap();
		},
	});

export const ExpensesForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementExpenses>
		| Update<Collections.TransportManagementExpenses>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Driver */}
					<FieldGroup>
						<FieldLegend>Driver</FieldLegend>
						<FieldDescription>Manage driver information</FieldDescription>

						<form.AppField name="driver">
							{(field) => (
								<field.RelationField<TransportManagementDriversResponse>
									pocketbase={pocketbase}
									collectionName={Collections.TransportManagementDrivers}
									relationshipName="driver"
									label="Driver"
									description="Associated driver"
									displayField="licenseNumber"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Trip */}
					<FieldGroup>
						<FieldLegend>Trip</FieldLegend>
						<FieldDescription>Manage trip information</FieldDescription>

						<form.AppField name="trip">
							{(field) => (
								<field.RelationField<TransportManagementTripsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.TransportManagementTrips}
									relationshipName="trip"
									label="Trip"
									description="Associated trip"
									displayField="id"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Category */}
					<FieldGroup>
						<FieldLegend>Category</FieldLegend>
						<FieldDescription>Manage category information</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Type of expense"
									options={[
										{ label: "Fuel", value: "fuel" },
										{ label: "Tolls", value: "tolls" },
										{ label: "Maintenance", value: "maintenance" },
										{ label: "Parking", value: "parking" },
										{ label: "Meals", value: "meals" },
										{ label: "Accomodation", value: "accomodation" },
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
									description="Expense amount"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Currency */}
					<FieldGroup>
						<FieldLegend>Currency</FieldLegend>
						<FieldDescription>Manage currency information</FieldDescription>

						<form.AppField name="currency">
							{(field) => (
								<field.SelectField
									label="Currency"
									description="Currency code"
									options={[
										{ label: "P H P", value: "PHP" },
										{ label: "U S D", value: "USD" },
										{ label: "E U R", value: "EUR" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Mileage */}
					<FieldGroup>
						<FieldLegend>Mileage</FieldLegend>
						<FieldDescription>Manage mileage information</FieldDescription>

						<form.AppField name="odometerReading">
							{(field) => (
								<field.NumberField
									label="Odometer Reading"
									description="Odometer reading"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Fuel */}
					<FieldGroup>
						<FieldLegend>Fuel</FieldLegend>
						<FieldDescription>Manage fuel information</FieldDescription>

						<form.AppField name="fuelQuantity">
							{(field) => (
								<field.NumberField
									label="Fuel Quantity"
									description="Fuel quantity in liters"
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

						<form.AppField name="status">
							{(field) => (
								<field.SelectField
									label="Status"
									description="Reimbursement status"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Approved", value: "approved" },
										{ label: "Rejected", value: "rejected" },
										{ label: "Reimbursed", value: "reimbursed" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Evidence */}
					<FieldGroup>
						<FieldLegend>Evidence</FieldLegend>
						<FieldDescription>Manage evidence information</FieldDescription>

						<form.AppField name="receipts">
							{(field) => (
								<field.TextField
									label="Receipts"
									description="Receipt images or documents"
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
				<ExpensesForm form={form as any} />
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
		queryKey: ["expenses", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementExpenses)
				.getOne<TransportManagementExpensesRecord>(searchQuery.id!),
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
				<ExpensesForm form={form as any} />
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
