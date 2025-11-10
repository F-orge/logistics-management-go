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
	WarehouseManagementPickBatchesResponse,
	WarehouseManagementTasksRecord,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import { WarehouseManagementTasksSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementTasksSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.WarehouseManagementTasks>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementTasks)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Tasks created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementTasksRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.WarehouseManagementTasks>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementTasks)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Tasks updated successfully",
				})
				.unwrap();
		},
	});

export const TasksForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementTasks>
		| Update<Collections.WarehouseManagementTasks>,
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

						<form.AppField name="taskNumber">
							{(field) => (
								<field.TextField
									label="Task Number"
									description="Unique task number"
									placeholder=""
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
									description="Associated warehouse"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Task Type */}
					<FieldGroup>
						<FieldLegend>Task Type</FieldLegend>
						<FieldDescription>Manage task type information</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Type of task"
									options={[
										{ label: "Putaway", value: "putaway" },
										{ label: "Pick", value: "pick" },
										{ label: "Pack", value: "pack" },
										{ label: "Replenishment", value: "replenishment" },
										{ label: "Cycle-count", value: "cycle-count" },
										{ label: "Cross-dock", value: "cross-dock" },
										{
											label: "Returns-processing",
											value: "returns-processing",
										},
										{ label: "Damage-inspection", value: "damage-inspection" },
										{ label: "Quality-check", value: "quality-check" },
									]}
									placeholder="Select..."
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
									description="Task priority (lower = higher)"
									placeholder="0"
									min={0}
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
									description="Current status"
									options={[
										{ label: "Pending", value: "pending" },
										{ label: "Assigned", value: "assigned" },
										{ label: "In-progress", value: "in-progress" },
										{ label: "Completed", value: "completed" },
										{ label: "Cancelled", value: "cancelled" },
										{ label: "Error", value: "error" },
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

						<form.AppField name="user">
							{(field) => (
								<field.RelationField<UsersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.Users}
									relationshipName="user"
									label="User"
									description="Assigned operator"
									displayField="username"
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

						<form.AppField name="pickBatchId">
							{(field) => (
								<field.RelationField<WarehouseManagementPickBatchesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementPickBatches}
									relationshipName="pickBatchId"
									label="Pick Batch Id"
									description="Associated pick batch"
									displayField="batchNumber"
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

						<form.AppField name="startTime">
							{(field) => (
								<field.DateTimeField
									label="Start Time"
									description="Task start time"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="endTime">
							{(field) => (
								<field.DateTimeField
									label="End Time"
									description="Task end time"
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

						<form.AppField name="instructions">
							{(field) => (
								<field.TextareaField
									label="Instructions"
									description="Task instructions"
									placeholder=""
								/>
							)}
						</form.AppField>
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

						<form.AppField name="attachments">
							{(field) => (
								<field.TextField
									label="Attachments"
									description="Task attachments"
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
				<TasksForm form={form as any} />
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
		queryKey: ["tasks", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementTasks)
				.getOne<WarehouseManagementTasksRecord>(searchQuery.id!),
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
				<TasksForm form={form as any} />
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
