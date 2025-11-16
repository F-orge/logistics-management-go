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
import { PickBatchesSchema } from "@/pocketbase/schemas/warehouse-management/pick-batches";

export const CreateSchema = z.object({
	batchNumber: PickBatchesSchema.shape.batchNumber.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-batchNumber-create",
		type: "field",
		label: "BatchNumber",
		description: "Enter a batchnumber",
		inputType: "text",
	}),
	status: PickBatchesSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	strategy: PickBatchesSchema.shape.strategy.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-strategy-create",
		type: "field",
		label: "Strategy",
		description: "Enter a strategy",
		inputType: "text",
	}),
	priority: PickBatchesSchema.shape.priority.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-priority-create",
		type: "field",
		label: "Priority",
		description: "Enter a priority",
		inputType: "number",
	}),
	assignedUser: PickBatchesSchema.shape.assignedUser.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-assignedUser-create",
		type: "field",
		label: "AssignedUser",
		description: "Enter an assigneduser",
		inputType: "text",
	}),
	estimatedDuration: PickBatchesSchema.shape.estimatedDuration.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-estimatedDuration-create",
		type: "field",
		label: "EstimatedDuration",
		description: "Enter an estimatedduration",
		inputType: "number",
	}),
	actualDuration: PickBatchesSchema.shape.actualDuration.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-actualDuration-create",
		type: "field",
		label: "ActualDuration",
		description: "Enter an actualduration",
		inputType: "number",
	}),
	totalItems: PickBatchesSchema.shape.totalItems.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-totalItems-create",
		type: "field",
		label: "TotalItems",
		description: "Enter a totalitems",
		inputType: "number",
	}),
	completedItems: PickBatchesSchema.shape.completedItems.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-completedItems-create",
		type: "field",
		label: "CompletedItems",
		description: "Enter a completeditems",
		inputType: "number",
	}),
	startedAt: PickBatchesSchema.shape.startedAt.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-startedAt-create",
		type: "field",
		label: "StartedAt",
		description: "Enter a startedat",
		inputType: "date",
	}),
	completedAt: PickBatchesSchema.shape.completedAt.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-completedAt-create",
		type: "field",
		label: "CompletedAt",
		description: "Enter a completedat",
		inputType: "date",
	}),
	items: PickBatchesSchema.shape.items.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-items-create",
		type: "field",
		label: "Items",
		description: "Enter an items",
		inputType: "text",
	})
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
				.collection(Collections.WarehouseManagementPickBatches)
				.create(value);
			toast.success("Pick Batches created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create pick-batches: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Pick Batches</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
