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
	TransportManagementRoutesRecord,
	TypedPocketBase,
	Update,
} from "@/lib/pb.types";
import { TransportManagementRoutesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementRoutesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementRoutes>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementRoutes)
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
	record: TransportManagementRoutesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.TransportManagementRoutes>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementRoutes)
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
		| Create<Collections.TransportManagementRoutes>
		| Update<Collections.TransportManagementRoutes>,
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
									description="Route name"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Route Details */}
					<FieldGroup>
						<FieldLegend>Route Details</FieldLegend>
						<FieldDescription>
							Manage route details information
						</FieldDescription>

						<form.AppField name="totalDistance">
							{(field) => (
								<field.NumberField
									label="Total Distance"
									description="Total distance in km"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="totalDuration">
							{(field) => (
								<field.NumberField
									label="Total Duration"
									description="Total duration in minutes"
									placeholder="0"
									min={0}
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
				.collection(Collections.TransportManagementRoutes)
				.getOne<TransportManagementRoutesRecord>(searchQuery.id!),
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
