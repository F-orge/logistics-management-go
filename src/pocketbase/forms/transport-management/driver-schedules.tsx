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
	TransportManagementDriverSchedulesRecord,
	TransportManagementDriversResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementDriverSchedulesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementDriverSchedulesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementDriverSchedules>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementDriverSchedules)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `DriverSchedules created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementDriverSchedulesRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.TransportManagementDriverSchedules>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementDriverSchedules)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "DriverSchedules updated successfully",
				})
				.unwrap();
		},
	});

export const DriverSchedulesForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementDriverSchedules>
		| Update<Collections.TransportManagementDriverSchedules>,
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

						<form.AppField name="startDate">
							{(field) => (
								<field.DateTimeField
									label="Start Date"
									description="Start date of unavailability"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="endDate">
							{(field) => (
								<field.DateTimeField
									label="End Date"
									description="End date of unavailability"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Reason */}
					<FieldGroup>
						<FieldLegend>Reason</FieldLegend>
						<FieldDescription>Manage reason information</FieldDescription>

						<form.AppField name="reason">
							{(field) => (
								<field.SelectField
									label="Reason"
									description="Reason for schedule"
									options={[
										{ label: "Vacation", value: "vacation" },
										{ label: "Sick-leave", value: "sick-leave" },
										{ label: "Training", value: "training" },
										{ label: "Personal-leave", value: "personal-leave" },
									]}
									placeholder="Select..."
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
				<DriverSchedulesForm form={form as any} />
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
		queryKey: ["driverschedules", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementDriverSchedules)
				.getOne<TransportManagementDriverSchedulesRecord>(searchQuery.id!),
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
				<DriverSchedulesForm form={form as any} />
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
