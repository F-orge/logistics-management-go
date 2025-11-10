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
	WarehouseManagementInventoryBatchesResponse,
	WarehouseManagementLocationsResponse,
	WarehouseManagementProductsResponse,
	WarehouseManagementTaskItemsRecord,
	WarehouseManagementTasksResponse,
} from "@/lib/pb.types";
import { WarehouseManagementTaskItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementTaskItemsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.WarehouseManagementTaskItems>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementTaskItems)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `TaskItems created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementTaskItemsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.WarehouseManagementTaskItems>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementTaskItems)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "TaskItems updated successfully",
				})
				.unwrap();
		},
	});

export const TaskItemsForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementTaskItems>
		| Update<Collections.WarehouseManagementTaskItems>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Task */}
					<FieldGroup>
						<FieldLegend>Task</FieldLegend>
						<FieldDescription>Manage task information</FieldDescription>

						<form.AppField name="task">
							{(field) => (
								<field.RelationField<WarehouseManagementTasksResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementTasks}
									relationshipName="task"
									label="Task"
									description="Parent warehouse task"
									displayField="taskNumber"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Product */}
					<FieldGroup>
						<FieldLegend>Product</FieldLegend>
						<FieldDescription>Manage product information</FieldDescription>

						<form.AppField name="product">
							{(field) => (
								<field.RelationField<WarehouseManagementProductsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementProducts}
									relationshipName="product"
									label="Product"
									description="Product for task"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Batch */}
					<FieldGroup>
						<FieldLegend>Batch</FieldLegend>
						<FieldDescription>Manage batch information</FieldDescription>

						<form.AppField name="batch">
							{(field) => (
								<field.RelationField<WarehouseManagementInventoryBatchesResponse>
									pocketbase={pocketbase}
									collectionName={
										Collections.WarehouseManagementInventoryBatches
									}
									relationshipName="batch"
									label="Batch"
									description="Inventory batch"
									displayField="batchNumber"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Source */}
					<FieldGroup>
						<FieldLegend>Source</FieldLegend>
						<FieldDescription>Manage source information</FieldDescription>

						<form.AppField name="sourceLocation">
							{(field) => (
								<field.RelationField<WarehouseManagementLocationsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementLocations}
									relationshipName="sourceLocation"
									label="Source Location"
									description="Source location"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Destination */}
					<FieldGroup>
						<FieldLegend>Destination</FieldLegend>
						<FieldDescription>Manage destination information</FieldDescription>

						<form.AppField name="destinationLocation">
							{(field) => (
								<field.RelationField<WarehouseManagementLocationsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementLocations}
									relationshipName="destinationLocation"
									label="Destination Location"
									description="Destination location"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Quantity */}
					<FieldGroup>
						<FieldLegend>Quantity</FieldLegend>
						<FieldDescription>Manage quantity information</FieldDescription>

						<form.AppField name="quantityRequired">
							{(field) => (
								<field.NumberField
									label="Quantity Required"
									description="Quantity required"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="quantityCompleted">
							{(field) => (
								<field.NumberField
									label="Quantity Completed"
									description="Quantity completed"
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
									description="Item status"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "In-progress", value: "in-progress" },
										{ label: "Completed", value: "completed" },
										{ label: "Short-picked", value: "short-picked" },
										{ label: "Damaged", value: "damaged" },
										{ label: "Not-found", value: "not-found" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Lot */}
					<FieldGroup>
						<FieldLegend>Lot</FieldLegend>
						<FieldDescription>Manage lot information</FieldDescription>

						<form.AppField name="lotNumber">
							{(field) => (
								<field.NumberField
									label="Lot Number"
									description="Lot number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Expiry */}
					<FieldGroup>
						<FieldLegend>Expiry</FieldLegend>
						<FieldDescription>Manage expiry information</FieldDescription>

						<form.AppField name="expiryDate">
							{(field) => (
								<field.DateTimeField
									label="Expiry Date"
									description="Expiration date"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Dates */}
					<FieldGroup>
						<FieldLegend>Dates</FieldLegend>
						<FieldDescription>Manage dates information</FieldDescription>

						<form.AppField name="completedAt">
							{(field) => (
								<field.DateTimeField
									label="Completed At"
									description="When item was completed"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Details */}
					<FieldGroup>
						<FieldLegend>Details</FieldLegend>
						<FieldDescription>Manage details information</FieldDescription>

						<form.AppField name="notes">
							{(field) => (
								<field.TextareaField
									label="Notes"
									description="Task notes"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Evidence */}
					<FieldGroup>
						<FieldLegend>Evidence</FieldLegend>
						<FieldDescription>Manage evidence information</FieldDescription>

						<form.AppField name="proofs">
							{(field) => (
								<field.TextField
									label="Proofs"
									description="Proof documents or photos"
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
				<TaskItemsForm form={form as any} />
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
		queryKey: ["taskitems", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementTaskItems)
				.getOne<WarehouseManagementTaskItemsRecord>(searchQuery.id!),
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
				<TaskItemsForm form={form as any} />
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
