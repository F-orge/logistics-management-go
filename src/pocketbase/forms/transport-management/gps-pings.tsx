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
	TransportManagementGpsPingsRecord,
	TransportManagementVehiclesResponse,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementGpsPingsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementGpsPingsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementGpsPings>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementGpsPings)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `GpsPings created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementGpsPingsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.TransportManagementGpsPings>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementGpsPings)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "GpsPings updated successfully",
				})
				.unwrap();
		},
	});

export const GpsPingsForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementGpsPings>
		| Update<Collections.TransportManagementGpsPings>,
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

					{/* Location */}
					<FieldGroup>
						<FieldLegend>Location</FieldLegend>
						<FieldDescription>Manage location information</FieldDescription>

						<form.AppField name="coordinates">
							{(field) => (
								<field.TextField
									label="Coordinates"
									description="GPS coordinates (latitude, longitude)"
									placeholder=""
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
									description="When GPS ping was recorded"
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
				<GpsPingsForm form={form as any} />
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
		queryKey: ["gpspings", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementGpsPings)
				.getOne<TransportManagementGpsPingsRecord>(searchQuery.id!),
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
				<GpsPingsForm form={form as any} />
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
