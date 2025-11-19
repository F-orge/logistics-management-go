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
import { PickBatchesSchema } from "@/pocketbase/schemas/warehouse-management/pick-batches";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	batchNumber: PickBatchesSchema.shape.batchNumber.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-batchNumber-update",
		type: "field",
		label: "BatchNumber",
		description: "Enter a batchnumber",
		inputType: "text",
	}),
	warehouse: PickBatchesSchema.shape.warehouse.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-warehouse-update",
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
	status: PickBatchesSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	strategy: PickBatchesSchema.shape.strategy.register(fieldRegistry, {
		id: "warehouse-management-pick-batches-strategy-update",
		type: "field",
		label: "Strategy",
		description: "Enter a strategy",
		inputType: "select",
	}),
	priority: PickBatchesSchema.shape.priority
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-priority-update",
			type: "field",
			label: "Priority",
			description: "Enter a priority",
			inputType: "number",
		}),
	assignedUser: PickBatchesSchema.shape.assignedUser
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-assignedUser-update",
			type: "field",
			label: "AssignedUser",
			description: "Enter an assigneduser",
			inputType: "relation",
			props: {
				collectionName: Collections.Users,
				displayField: "email",
				relationshipName: "assignedUser",
			},
		}),
	estimatedDuration: PickBatchesSchema.shape.estimatedDuration
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-estimatedDuration-update",
			type: "field",
			label: "EstimatedDuration",
			description: "Enter an estimatedduration",
			inputType: "number",
		}),
	actualDuration: PickBatchesSchema.shape.actualDuration
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-actualDuration-update",
			type: "field",
			label: "ActualDuration",
			description: "Enter an actualduration",
			inputType: "number",
		}),
	totalItems: PickBatchesSchema.shape.totalItems
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-totalItems-update",
			type: "field",
			label: "TotalItems",
			description: "Enter a totalitems",
			inputType: "number",
		}),
	completedItems: PickBatchesSchema.shape.completedItems
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-completedItems-update",
			type: "field",
			label: "CompletedItems",
			description: "Enter a completeditems",
			inputType: "number",
		}),
	startedAt: PickBatchesSchema.shape.startedAt
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-startedAt-update",
			type: "field",
			label: "StartedAt",
			description: "Enter a startedat",
			inputType: "date",
			props: {
				showTime: true,
				disabled: true,
			},
		}),
	completedAt: PickBatchesSchema.shape.completedAt
		.optional()
		.register(fieldRegistry, {
			id: "warehouse-management-pick-batches-completedAt-update",
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
				.pocketbase!.collection(Collections.WarehouseManagementPickBatches)
				.update(meta.id!, value);

			toast.success("Pick Batches updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update pick-batches: ${error.message} (${error.status})`,
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
		queryKey: ["pickBatches", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.WarehouseManagementPickBatches)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: {
			...data,
			startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
			completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
		} as z.infer<typeof UpdateSchema>,
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
					<form.SubmitButton>Update Pick Batches</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
