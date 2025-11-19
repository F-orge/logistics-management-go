import { formOptions } from "@tanstack/react-form";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
	fieldRegistry,
	fieldSetRegistry,
	toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { TaskItemsSchema } from "@/pocketbase/schemas/warehouse-management";
import { TasksSchema } from "@/pocketbase/schemas/warehouse-management/tasks";

const CreateItemSchema = z
	.object({
		product: TaskItemsSchema.shape.product.register(fieldRegistry, {
			id: "warehouse-management-task-items-product-subitem-create",
			type: "field",
			label: "Product",
			description: "Enter a product",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementProducts,
				displayField: "name",
				relationshipName: "product",
			},
		}),
		batch: TaskItemsSchema.shape.batch.register(fieldRegistry, {
			id: "warehouse-management-task-items-batch-subitem-create",
			type: "field",
			label: "Batch",
			description: "Enter a batch",
			inputType: "relation",
			props: {
				collectionName: Collections.WarehouseManagementInventoryBatches,
				displayField: "batchNumber",
				relationshipName: "batch",
			},
		}),
		sourceLocation: TaskItemsSchema.shape.sourceLocation.register(
			fieldRegistry,
			{
				id: "warehouse-management-task-items-sourceLocation-subitem-create",
				type: "field",
				label: "SourceLocation",
				description: "Enter a sourcelocation",
				inputType: "relation",
				props: {
					collectionName: Collections.WarehouseManagementLocations,
					relationshipName: "sourceLocation",
					displayField: "name",
				},
			},
		),
		destinationLocation: TaskItemsSchema.shape.destinationLocation.register(
			fieldRegistry,
			{
				id: "warehouse-management-task-items-destinationLocation-subitem-create",
				type: "field",
				label: "DestinationLocation",
				description: "Enter a destinationlocation",
				inputType: "relation",
				props: {
					collectionName: Collections.WarehouseManagementLocations,
					relationshipName: "destinationLocation",
					displayField: "name",
				},
			},
		),
		quantityRequired: TaskItemsSchema.shape.quantityRequired.register(
			fieldRegistry,
			{
				id: "warehouse-management-task-items-quantityRequired-subitem-create",
				type: "field",
				label: "QuantityRequired",
				description: "Enter a quantityrequired",
				inputType: "number",
			},
		),
		quantityCompleted: TaskItemsSchema.shape.quantityCompleted.register(
			fieldRegistry,
			{
				id: "warehouse-management-task-items-quantityCompleted-subitem-create",
				type: "field",
				label: "QuantityCompleted",
				description: "Enter a quantitycompleted",
				inputType: "number",
			},
		),
		status: TaskItemsSchema.shape.status.register(fieldRegistry, {
			id: "warehouse-management-task-items-status-subitem-create",
			type: "field",
			label: "Status",
			description: "Enter a status",
			inputType: "select",
		}),
		lotNumber: TaskItemsSchema.shape.lotNumber.register(fieldRegistry, {
			id: "warehouse-management-task-items-lotNumber-subitem-create",
			type: "field",
			label: "LotNumber",
			description: "Enter a lotnumber",
			inputType: "number",
		}),
		expiryDate: TaskItemsSchema.shape.expiryDate.register(fieldRegistry, {
			id: "warehouse-management-task-items-expiryDate-subitem-create",
			type: "field",
			label: "ExpiryDate",
			description: "Enter an expirydate",
			inputType: "date",
			props: {
				showTime: true,
			},
		}),
		notes: TaskItemsSchema.shape.notes.register(fieldRegistry, {
			id: "warehouse-management-task-items-notes-subitem-create",
			type: "field",
			label: "Notes",
			description: "Enter a notes",
			inputType: "textarea",
		}),
		completedAt: TaskItemsSchema.shape.completedAt.register(fieldRegistry, {
			id: "warehouse-management-task-items-completedAt-subitem-create",
			type: "field",
			label: "CompletedAt",
			description: "Enter a completedat",
			inputType: "date",
			props: {
				showTime: true,
			},
		}),
	})
	.register(fieldSetRegistry, {
		legend: "Task Items",
		description: "Add items for the task",
	});

export const CreateSchema = z.object({
	taskNumber: TasksSchema.shape.taskNumber.register(fieldRegistry, {
		id: "warehouse-management-tasks-taskNumber-create",
		type: "field",
		label: "TaskNumber",
		description: "Enter a tasknumber",
		inputType: "text",
	}),
	warehouse: TasksSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-tasks-warehouse-create",
		type: "field",
		label: "Warehouse",
		description: "Enter a warehouse",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementWarehouses,
			displayField: "name",
			relationshipName: "warehouse",
		},
	}),
	user: TasksSchema.shape.user.register(fieldRegistry, {
		id: "warehouse-management-tasks-user-create",
		type: "field",
		label: "User",
		description: "Enter an user",
		inputType: "relation",
		props: {
			collectionName: Collections.Users,
			displayField: "email",
			relationshipName: "user",
		},
	}),
	type: TasksSchema.shape.type.register(fieldRegistry, {
		id: "warehouse-management-tasks-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "select",
	}),
	status: TasksSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-tasks-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	priority: TasksSchema.shape.priority.register(fieldRegistry, {
		id: "warehouse-management-tasks-priority-create",
		type: "field",
		label: "Priority",
		description: "Enter a priority",
		inputType: "number",
	}),
	pickBatchId: TasksSchema.shape.pickBatchId.register(fieldRegistry, {
		id: "warehouse-management-tasks-pickBatchId-create",
		type: "field",
		label: "PickBatchId",
		description: "Enter a pickbatchid",
		inputType: "relation",
		props: {
			collectionName: Collections.WarehouseManagementPickBatches,
			displayField: "name",
			relationshipName: "pickBatchId",
		},
	}),
	instructions: TasksSchema.shape.instructions.register(fieldRegistry, {
		id: "warehouse-management-tasks-instructions-create",
		type: "field",
		label: "Instructions",
		description: "Enter an instructions",
		inputType: "textarea",
	}),
	notes: TasksSchema.shape.notes.register(fieldRegistry, {
		id: "warehouse-management-tasks-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "textarea",
	}),
	startTime: TasksSchema.shape.startTime.register(fieldRegistry, {
		id: "warehouse-management-tasks-startTime-create",
		type: "field",
		label: "StartTime",
		description: "Enter a starttime",
		inputType: "date",
		props: {
			showTime: true,
		},
	}),
	endTime: TasksSchema.shape.endTime.register(fieldRegistry, {
		id: "warehouse-management-tasks-endTime-create",
		type: "field",
		label: "EndTime",
		description: "Enter an endtime",
		inputType: "date",
		props: {
			showTime: true,
		},
	}),
	items: CreateItemSchema.array(),
});

const FormOption = formOptions({
	defaultValues: {
		status: "pending",
	} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		let taskId: string | null = null;

		try {
			const { items, ...taskData } = value;

			const createdTask = await meta.pocketbase
				.collection(Collections.WarehouseManagementTasks)
				.create(taskData);

			taskId = createdTask.id;

			const batch = meta.pocketbase.createBatch();

			for (const item of items) {
				batch.collection(Collections.WarehouseManagementTaskItems).create({
					...item,
					task: createdTask.id,
				});
			}

			await batch.send();

			toast.success("Tasks created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				if (taskId) {
					// Rollback task creation if task items creation failed
					try {
						await meta.pocketbase
							.collection(Collections.WarehouseManagementTasks)
							.delete(taskId);
					} catch (deleteError) {
						console.error(
							"Failed to rollback task after item creation failure:",
							deleteError,
						);
					}
				}

				toast.error(
					`Failed to create tasks: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm(FormOption);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Tasks</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
