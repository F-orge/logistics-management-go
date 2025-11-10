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
	WarehouseManagementPickBatchesRecord,
	WarehouseManagementPickBatchItemsResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import { WarehouseManagementPickBatchesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementPickBatchesSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.WarehouseManagementPickBatches>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementPickBatches)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `PickBatches created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementPickBatchesRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.WarehouseManagementPickBatches>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementPickBatches)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "PickBatches updated successfully",
				})
				.unwrap();
		},
	});

export const PickBatchesForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementPickBatches>
		| Update<Collections.WarehouseManagementPickBatches>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
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
									description="Associated warehouse"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="batchNumber">
							{(field) => (
								<field.TextField
									label="Batch Number"
									description="Batch number"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Priority */}
					<FieldGroup>
						<FieldLegend>Priority</FieldLegend>
						<FieldDescription>Manage priority information</FieldDescription>

						<form.AppField name="priority">
							{(field) => (
								<field.NumberField
									label="Priority"
									description="Batch priority (lower = higher)"
									placeholder="0"
									min={0}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Strategy */}
					<FieldGroup>
						<FieldLegend>Strategy</FieldLegend>
						<FieldDescription>Manage strategy information</FieldDescription>

						<form.AppField name="strategy">
							{(field) => (
								<field.SelectField
									label="Strategy"
									description="Picking strategy used"
									options={[
										{ label: "Batch-picking", value: "batch-picking" },
										{ label: "Zone-picking", value: "zone-picking" },
										{ label: "Wave-picking", value: "wave-picking" },
										{
											label: "Single-order-picking",
											value: "single-order-picking",
										},
										{ label: "Cluster-picking", value: "cluster-picking" },
									]}
									placeholder="Select..."
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
										{ label: "Open", value: "open" },
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

					{/* Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>Manage assignment information</FieldDescription>

						<form.AppField name="assignedUser">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Users}
									relationshipName="assignedUser"
									label="Assigned User"
									description="Assigned picker/operator"
									displayField="username"
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
									description="When picking started"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="completedAt">
							{(field) => (
								<field.DateTimeField
									label="Completed At"
									description="When picking completed"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Estimation */}
					<FieldGroup>
						<FieldLegend>Estimation</FieldLegend>
						<FieldDescription>Manage estimation information</FieldDescription>

						<form.AppField name="estimatedDuration">
							{(field) => (
								<field.NumberField
									label="Estimated Duration"
									description="Estimated duration in minutes"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Actual */}
					<FieldGroup>
						<FieldLegend>Actual</FieldLegend>
						<FieldDescription>Manage actual information</FieldDescription>

						<form.AppField name="actualDuration">
							{(field) => (
								<field.NumberField
									label="Actual Duration"
									description="Actual duration in minutes"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Items */}
					<FieldGroup>
						<FieldLegend>Items</FieldLegend>
						<FieldDescription>Manage items information</FieldDescription>

						<form.AppField name="totalItems">
							{(field) => (
								<field.NumberField
									label="Total Items"
									description="Total items in batch"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="completedItems">
							{(field) => (
								<field.NumberField
									label="Completed Items"
									description="Items completed"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="items">
							{(field) => (
								<field.RelationField<WarehouseManagementPickBatchItemsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementPickBatchItems}
									relationshipName="items"
									label="Items"
									description="Batch line items"
									displayField="id"
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
				<PickBatchesForm form={form as any} />
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
		queryKey: ["pickbatches", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementPickBatches)
				.getOne<WarehouseManagementPickBatchesRecord>(searchQuery.id!),
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
				<PickBatchesForm form={form as any} />
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
