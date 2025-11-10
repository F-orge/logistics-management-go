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
	UsersResponse,
	WarehouseManagementReturnsRecord,
	WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";
import { WarehouseManagementReturnsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementReturnsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.WarehouseManagementReturns>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Returns created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementReturnsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.WarehouseManagementReturns>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Returns updated successfully",
				})
				.unwrap();
		},
	});

export const ReturnsForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementReturns>
		| Update<Collections.WarehouseManagementReturns>,
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

						<form.AppField name="returnNumber">
							{(field) => (
								<field.TextField
									label="Return Number"
									description="Unique return number"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Client */}
					<FieldGroup>
						<FieldLegend>Client</FieldLegend>
						<FieldDescription>Manage client information</FieldDescription>

						<form.AppField name="client">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Users}
									relationshipName="client"
									label="Client"
									description="Customer returning items"
									displayField="username"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Order */}
					<FieldGroup>
						<FieldLegend>Order</FieldLegend>
						<FieldDescription>Manage order information</FieldDescription>

						<form.AppField name="salesOrder">
							{(field) => (
								<field.RelationField<WarehouseManagementSalesOrdersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementSalesOrders}
									relationshipName="salesOrder"
									label="Sales Order"
									description="Original sales order"
									displayField="orderNumber"
									recordListOption={{}}
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
									description="Current return status"
									options={[
										{ label: "Requested", value: "requested" },
										{ label: "Approved", value: "approved" },
										{ label: "Rejeceted", value: "rejeceted" },
										{ label: "Received", value: "received" },
										{ label: "Processed", value: "processed" },
									]}
									placeholder="Select..."
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
								<field.TextareaField
									label="Reason"
									description="Reason for return"
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
				<ReturnsForm form={form as any} />
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
		queryKey: ["returns", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementReturns)
				.getOne<WarehouseManagementReturnsRecord>(searchQuery.id!),
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
				<ReturnsForm form={form as any} />
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
