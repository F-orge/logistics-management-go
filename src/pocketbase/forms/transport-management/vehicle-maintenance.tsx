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
	TransportManagementVehicleMaintenanceRecord,
	TransportManagementVehiclesResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementVehicleMaintenanceSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementVehicleMaintenanceSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues:
			{} as Create<Collections.TransportManagementVehicleMaintenance>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementVehicleMaintenance)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `VehicleMaintenance created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementVehicleMaintenanceRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.TransportManagementVehicleMaintenance>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementVehicleMaintenance)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "VehicleMaintenance updated successfully",
				})
				.unwrap();
		},
	});

export const VehicleMaintenanceForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementVehicleMaintenance>
		| Update<Collections.TransportManagementVehicleMaintenance>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Vehicle */}
					<FieldGroup>
						<FieldLegend>Vehicle</FieldLegend>
						<FieldDescription>Manage vehicle information</FieldDescription>

						<form.AppField name="vehicle">
							{(field) => (
								<field.RelationField<TransportManagementVehiclesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.TransportManagementVehicles}
									relationshipName="vehicle"
									label="Vehicle"
									description="Associated vehicle"
									displayField="registrationNumber"
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

						<form.AppField name="serviceDate">
							{(field) => (
								<field.DateTimeField
									label="Service Date"
									description="When service was performed"
									placeholder=""
									required
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
								<field.DateTimeField
									label="Service Type"
									description="Type/category of service (date format in pb.types)"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Cost */}
					<FieldGroup>
						<FieldLegend>Cost</FieldLegend>
						<FieldDescription>Manage cost information</FieldDescription>

						<form.AppField name="cost">
							{(field) => (
								<field.NumberField
									label="Cost"
									description="Service cost"
									placeholder="0"
									min={0}
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
									description="Service notes"
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
				<VehicleMaintenanceForm form={form as any} />
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
		queryKey: ["vehiclemaintenance", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementVehicleMaintenance)
				.getOne<TransportManagementVehicleMaintenanceRecord>(searchQuery.id!),
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
				<VehicleMaintenanceForm form={form as any} />
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
