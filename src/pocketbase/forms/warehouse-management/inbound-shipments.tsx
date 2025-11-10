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
	WarehouseManagementInboundShipmentsRecord,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import { WarehouseManagementInboundShipmentsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementInboundShipmentsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues:
			{} as Create<Collections.WarehouseManagementInboundShipments>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementInboundShipments)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `InboundShipments created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementInboundShipmentsRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.WarehouseManagementInboundShipments>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementInboundShipments)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "InboundShipments updated successfully",
				})
				.unwrap();
		},
	});

export const InboundShipmentsForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementInboundShipments>
		| Update<Collections.WarehouseManagementInboundShipments>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
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
									description="Associated client"
									displayField="username"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Warehouse */}
					<FieldGroup>
						<FieldLegend>Warehouse</FieldLegend>
						<FieldDescription>Manage warehouse information</FieldDescription>

						<form.AppField name="warehouse">
							{(field) => (
								<field.RelationField<WarehouseManagementWarehousesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementWarehouses}
									relationshipName="warehouse"
									label="Warehouse"
									description="Destination warehouse"
									displayField="name"
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

						<form.AppField name="expectedArrivalDate">
							{(field) => (
								<field.DateTimeField
									label="Expected Arrival Date"
									description="Expected arrival date"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="actualArrivalDate">
							{(field) => (
								<field.DateTimeField
									label="Actual Arrival Date"
									description="Actual arrival date"
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
									description="Current status"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Arrived", value: "arrived" },
										{ label: "Processing", value: "processing" },
										{ label: "Completed", value: "completed" },
										{ label: "Cancelled", value: "cancelled" },
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
				<InboundShipmentsForm form={form as any} />
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
		queryKey: ["inboundshipments", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementInboundShipments)
				.getOne<WarehouseManagementInboundShipmentsRecord>(searchQuery.id!),
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
				<InboundShipmentsForm form={form as any} />
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
