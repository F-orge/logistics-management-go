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
	DeliveryManagementRoutesRecord,
	TransportManagementDriversResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { DeliveryManagementRoutesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = DeliveryManagementRoutesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.DeliveryManagementRoutes>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.DeliveryManagementRoutes)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Routes created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: DeliveryManagementRoutesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.DeliveryManagementRoutes>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.DeliveryManagementRoutes)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Routes updated successfully",
				})
				.unwrap();
		},
	});

export const RoutesForm = withForm({
	defaultValues: {} as
		| Create<Collections.DeliveryManagementRoutes>
		| Update<Collections.DeliveryManagementRoutes>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="Route name"
									placeholder=""
									required
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
									description="Current route status"
									options={[
										{ label: "Active", value: "active" },
										{ label: "Planning", value: "planning" },
										{ label: "In-progress", value: "in-progress" },
										{ label: "Completed", value: "completed" },
										{ label: "Cancelled", value: "cancelled" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="routeDate">
							{(field) => (
								<field.DateTimeField
									label="Route Date"
									description="Date for this route"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>Manage assignment information</FieldDescription>

						<form.AppField name="driver">
							{(field) => (
								<field.RelationField<TransportManagementDriversResponse>
									pocketbase={pocketbase}
									collectionName={Collections.TransportManagementDrivers}
									relationshipName="driver"
									label="Driver"
									description="Assigned driver"
									displayField="licenseNumber"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Execution */}
					<FieldGroup>
						<FieldLegend>Execution</FieldLegend>
						<FieldDescription>Manage execution information</FieldDescription>

						<form.AppField name="startedAt">
							{(field) => (
								<field.DateTimeField
									label="Started At"
									description="When route started"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="completedAt">
							{(field) => (
								<field.DateTimeField
									label="Completed At"
									description="When route was completed"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Metrics */}
					<FieldGroup>
						<FieldLegend>Metrics</FieldLegend>
						<FieldDescription>Manage metrics information</FieldDescription>

						<form.AppField name="estimatedDurationInMinutes">
							{(field) => (
								<field.NumberField
									label="Estimated Duration In Minutes"
									description="Estimated time in minutes"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="totalDistance">
							{(field) => (
								<field.NumberField
									label="Total Distance"
									description="Total route distance in km"
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
				<RoutesForm form={form as any} />
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
		queryKey: ["routes", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.DeliveryManagementRoutes)
				.getOne<DeliveryManagementRoutesRecord>(searchQuery.id!),
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
				<RoutesForm form={form as any} />
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
