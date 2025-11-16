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
	toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { TaskItemsSchema } from "@/pocketbase/schemas/warehouse-management/task-items";

export const CreateSchema = z.object({
	task: TaskItemsSchema.shape.task.register(fieldRegistry, {
		id: "warehouse-management-task-items-task-create",
		type: "field",
		label: "Task",
		description: "Enter a task",
		inputType: "text",
	}),
	product: TaskItemsSchema.shape.product.register(fieldRegistry, {
		id: "warehouse-management-task-items-product-create",
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
		id: "warehouse-management-task-items-batch-create",
		type: "field",
		label: "Batch",
		description: "Enter a batch",
		inputType: "text",
	}),
	sourceLocation: TaskItemsSchema.shape.sourceLocation.register(fieldRegistry, {
		id: "warehouse-management-task-items-sourceLocation-create",
		type: "field",
		label: "SourceLocation",
		description: "Enter a sourcelocation",
		inputType: "text",
	}),
	destinationLocation: TaskItemsSchema.shape.destinationLocation.register(
		fieldRegistry,
		{
			id: "warehouse-management-task-items-destinationLocation-create",
			type: "field",
			label: "DestinationLocation",
			description: "Enter a destinationlocation",
			inputType: "text",
		},
	),
	quantityRequired: TaskItemsSchema.shape.quantityRequired.register(
		fieldRegistry,
		{
			id: "warehouse-management-task-items-quantityRequired-create",
			type: "field",
			label: "QuantityRequired",
			description: "Enter a quantityrequired",
			inputType: "number",
		},
	),
	quantityCompleted: TaskItemsSchema.shape.quantityCompleted.register(
		fieldRegistry,
		{
			id: "warehouse-management-task-items-quantityCompleted-create",
			type: "field",
			label: "QuantityCompleted",
			description: "Enter a quantitycompleted",
			inputType: "number",
		},
	),
	status: TaskItemsSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-task-items-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	lotNumber: TaskItemsSchema.shape.lotNumber.register(fieldRegistry, {
		id: "warehouse-management-task-items-lotNumber-create",
		type: "field",
		label: "LotNumber",
		description: "Enter a lotnumber",
		inputType: "number",
	}),
	expiryDate: TaskItemsSchema.shape.expiryDate.register(fieldRegistry, {
		id: "warehouse-management-task-items-expiryDate-create",
		type: "field",
		label: "ExpiryDate",
		description: "Enter an expirydate",
		inputType: "date",
	}),
	notes: TaskItemsSchema.shape.notes.register(fieldRegistry, {
		id: "warehouse-management-task-items-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	completedAt: TaskItemsSchema.shape.completedAt.register(fieldRegistry, {
		id: "warehouse-management-task-items-completedAt-create",
		type: "field",
		label: "CompletedAt",
		description: "Enter a completedat",
		inputType: "date",
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta.pocketbase
				.collection(Collections.WarehouseManagementTaskItems)
				.create(value);
			toast.success("Task Items created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create task-items: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Task Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
