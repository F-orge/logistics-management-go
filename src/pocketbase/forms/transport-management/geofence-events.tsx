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
	TransportManagementGeofenceEventsRecord,
	TransportManagementGeofenceResponse,
	TransportManagementVehiclesResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementGeofenceEventsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementGeofenceEventsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementGeofenceEvents>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementGeofenceEvents)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `GeofenceEvents created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementGeofenceEventsRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.TransportManagementGeofenceEvents>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementGeofenceEvents)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "GeofenceEvents updated successfully",
				})
				.unwrap();
		},
	});

export const GeofenceEventsForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementGeofenceEvents>
		| Update<Collections.TransportManagementGeofenceEvents>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Geofence */}
					<FieldGroup>
						<FieldLegend>Geofence</FieldLegend>
						<FieldDescription>Manage geofence information</FieldDescription>

						<form.AppField name="geofence">
							{(field) => (
								<field.RelationField<TransportManagementGeofenceResponse>
									pocketbase={pocketbase}
									collectionName={Collections.TransportManagementGeofence}
									relationshipName="geofence"
									label="Geofence"
									description="Associated geofence"
									displayField="name"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

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

					{/* Event Type */}
					<FieldGroup>
						<FieldLegend>Event Type</FieldLegend>
						<FieldDescription>Manage event type information</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Entry or exit event"
									options={[
										{ label: "Enter", value: "enter" },
										{ label: "Exit", value: "exit" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="timestamp">
							{(field) => (
								<field.DateTimeField
									label="Timestamp"
									description="When event occurred"
									placeholder=""
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
				<GeofenceEventsForm form={form as any} />
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
		queryKey: ["geofenceevents", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementGeofenceEvents)
				.getOne<TransportManagementGeofenceEventsRecord>(searchQuery.id!),
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
				<GeofenceEventsForm form={form as any} />
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
