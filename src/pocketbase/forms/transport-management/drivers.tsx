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
	TransportManagementDriversRecord,
	TypedPocketBase,
	Update,
	UsersResponse,
} from "@/lib/pb.types";
import { TransportManagementDriversSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementDriversSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.TransportManagementDrivers>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementDrivers)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Drivers created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: TransportManagementDriversRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.TransportManagementDrivers>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.TransportManagementDrivers)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Drivers updated successfully",
				})
				.unwrap();
		},
	});

export const DriversForm = withForm({
	defaultValues: {} as
		| Create<Collections.TransportManagementDrivers>
		| Update<Collections.TransportManagementDrivers>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* License Information */}
					<FieldGroup>
						<FieldLegend>License Information</FieldLegend>
						<FieldDescription>
							Manage license information information
						</FieldDescription>

						<form.AppField name="licenseNumber">
							{(field) => (
								<field.TextField
									label="License Number"
									description="Driver's license number"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
						<form.AppField name="licenseExpiryDate">
							{(field) => (
								<field.DateTimeField
									label="License Expiry Date"
									description="Date when driver's license expires"
									placeholder=""
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
									description="Driver's current status"
									options={[
										{ label: "Active", value: "active" },
										{ label: "Inactive", value: "inactive" },
										{ label: "On-leave", value: "on-leave" },
									]}
									placeholder="Select..."
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* User Account */}
					<FieldGroup>
						<FieldLegend>User Account</FieldLegend>
						<FieldDescription>Manage user account information</FieldDescription>

						<form.AppField name="user">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Collections.Users}
									relationshipName="user"
									label="User"
									description="Associated user account for this driver"
									displayField="name"
									recordListOption={{}}
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
				<DriversForm form={form as any} />
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
		queryKey: ["drivers", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.TransportManagementDrivers)
				.getOne<TransportManagementDriversRecord>(searchQuery.id!),
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
				<DriversForm form={form as any} />
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
