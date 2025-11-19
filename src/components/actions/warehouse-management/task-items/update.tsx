import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
	useSearch,
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
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	task: TaskItemsSchema.shape.task.optional().register(fieldRegistry, {
		id: "warehouse-management-task-items-task-update",
		type: "field",
		label: "Task",
		description: "Enter a task",
		inputType: "text",
	}),
	product: TaskItemsSchema.shape.product.optional().register(fieldRegistry, {
		id: "warehouse-management-task-items-product-update",
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
	batch: TaskItemsSchema.shape.batch.optional().register(fieldRegistry, {
		id: "warehouse-management-task-items-batch-update",
		type: "field",
		label: "Batch",
		description: "Enter a batch",
		inputType: "text",
	}),
	sourceLocation: TaskItemsSchema.shape.sourceLocation
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-task-items-sourceLocation-update",
			type: "field",
			label: "SourceLocation",
			description: "Enter a sourcelocation",
			inputType: "text",
		}),
	destinationLocation: TaskItemsSchema.shape.destinationLocation
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-task-items-destinationLocation-update",
			type: "field",
			label: "DestinationLocation",
			description: "Enter a destinationlocation",
			inputType: "text",
		}),
	quantityRequired: TaskItemsSchema.shape.quantityRequired
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-task-items-quantityRequired-update",
			type: "field",
			label: "QuantityRequired",
			description: "Enter a quantityrequired",
			inputType: "number",
		}),
	quantityCompleted: TaskItemsSchema.shape.quantityCompleted
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-task-items-quantityCompleted-update",
			type: "field",
			label: "QuantityCompleted",
			description: "Enter a quantitycompleted",
			inputType: "number",
		}),
	status: TaskItemsSchema.shape.status.optional().register(fieldRegistry, {
		id: "warehouse-management-task-items-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	lotNumber: TaskItemsSchema.shape.lotNumber
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-task-items-lotNumber-update",
			type: "field",
			label: "LotNumber",
			description: "Enter a lotnumber",
			inputType: "number",
		}),
	expiryDate: TaskItemsSchema.shape.expiryDate
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-task-items-expiryDate-update",
			type: "field",
			label: "ExpiryDate",
			description: "Enter an expirydate",
			inputType: "date",
		}),
	notes: TaskItemsSchema.shape.notes.optional().register(fieldRegistry, {
		id: "warehouse-management-task-items-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	completedAt: TaskItemsSchema.shape.completedAt
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-task-items-completedAt-update",
			type: "field",
			label: "CompletedAt",
			description: "Enter a completedat",
			inputType: "date",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateSchema>,
	validators: {
		onSubmit: UpdateSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.WarehouseManagementTaskItems)
				.update(meta.id!, value);

			toast.success("Task Items updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update task-items: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["taskItems", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementTaskItems)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data as z.infer<typeof UpdateSchema>,
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase, id: searchQuery.id! });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Task Items</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
