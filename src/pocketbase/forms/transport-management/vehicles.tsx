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
	TransportManagementVehiclesRecord,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementVehiclesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementVehiclesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementVehicles>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementVehicles)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Vehicles created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementVehiclesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.TransportManagementVehicles>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementVehicles)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Vehicles updated successfully",
				})
				.unwrap();
		},
	});

export const VehiclesForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementVehicles>
		| Update<Collections.TransportManagementVehicles>,
	render: ({ form }) => {
		return (
			<form.AppForm>
				<FieldSet>
					{/* Registration */}
					<FieldGroup>
						<FieldLegend>Registration</FieldLegend>
						<FieldDescription>Manage registration information</FieldDescription>

						<form.AppField name="registrationNumber">
							{(field) => (
								<field.TextField
									label="Registration Number"
									description="Vehicle registration or license plate number"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="model">
							{(field) => (
								<field.TextField
									label="Model"
									description="Vehicle model and make"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Capacity */}
					<FieldGroup>
						<FieldLegend>Capacity</FieldLegend>
						<FieldDescription>Manage capacity information</FieldDescription>

						<form.AppField name="capacityWeight">
							{(field) => (
								<field.NumberField
									label="Capacity Weight"
									description="Maximum weight capacity in kg"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="capacityVolume">
							{(field) => (
								<field.NumberField
									label="Capacity Volume"
									description="Maximum volume capacity in cubic meters"
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
									description="Operational status of the vehicle"
									options={[
										{ label: "Available", value: "available" },
										{ label: "In-maintenance", value: "in-maintenance" },
										{ label: "On-trip", value: "on-trip" },
										{ label: "Out-of-service", value: "out-of-service" },
									]}
									placeholder="Select..."
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
				<VehiclesForm form={form as any} />
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
		queryKey: ["vehicles", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementVehicles)
				.getOne<TransportManagementVehiclesRecord>(searchQuery.id!),
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
				<VehiclesForm form={form as any} />
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
