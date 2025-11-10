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
	TypedPocketBase,
	Update,
	UsersRecord,
} from "@/lib/pb.types";
import { UsersUsersSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = UsersUsersSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.Users>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.Users)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Users created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: UsersRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.Users>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.Users)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Users updated successfully",
				})
				.unwrap();
		},
	});

export const UsersForm = withForm({
	defaultValues: {} as Create<Collections.Users> | Update<Collections.Users>,
	render: ({ form }) => {
		return (
			<form.AppForm>
				<FieldSet>
					{/* Authentication */}
					<FieldGroup>
						<FieldLegend>Authentication</FieldLegend>
						<FieldDescription>
							Manage authentication information
						</FieldDescription>

						<form.AppField name="email">
							{(field) => (
								<field.EmailField
									label="Email"
									description="User email address"
									placeholder="example@email.com"
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Profile */}
					<FieldGroup>
						<FieldLegend>Profile</FieldLegend>
						<FieldDescription>Manage profile information</FieldDescription>

						<form.AppField name="username">
							{(field) => (
								<field.TextField
									label="Username"
									description="User username"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="User full name"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="avatar">
							{(field) => (
								<field.TextField
									label="Avatar"
									description="User avatar image"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Permissions */}
					<FieldGroup>
						<FieldLegend>Permissions</FieldLegend>
						<FieldDescription>Manage permissions information</FieldDescription>

						<form.AppField name="roles">
							{(field) => (
								<field.TextField
									label="Roles"
									description="User roles"
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

						<form.AppField name="verified">
							{(field) => (
								<field.TextField
									label="Verified"
									description="Whether email is verified"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Privacy */}
					<FieldGroup>
						<FieldLegend>Privacy</FieldLegend>
						<FieldDescription>Manage privacy information</FieldDescription>

						<form.AppField name="emailVisibility">
							{(field) => (
								<field.TextField
									label="Email Visibility"
									description="Whether email is visible to others"
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
				<UsersForm form={form as any} />
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
		queryKey: ["users", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.Users)
				.getOne<UsersRecord>(searchQuery.id!),
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
				<UsersForm form={form as any} />
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
