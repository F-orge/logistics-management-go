import { formOptions } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
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
import { TasksSchema } from "@/pocketbase/schemas/delivery-management/tasks";
import { CreateTaskSchema } from "./create";

export const UpdateTaskSchema = z.object({
	package: TasksSchema.shape.package.optional().register(fieldRegistry, {
		id: "dm-tasks-package-update",
		type: "field",
		label: "Package",
		description: "Enter the package identifier",
		inputType: "text",
	}),
	route: TasksSchema.shape.route.optional().register(fieldRegistry, {
		id: "dm-tasks-route-update",
		type: "field",
		label: "Route",
		description: "Enter the route identifier",
		inputType: "text",
	}),
	sequence: TasksSchema.shape.sequence.optional().register(fieldRegistry, {
		id: "dm-tasks-sequence-update",
		type: "field",
		label: "Sequence",
		description: "Enter the sequence number",
		inputType: "number",
	}),
	deliveryAddress: TasksSchema.shape.deliveryAddress
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-deliveryAddress-update",
			type: "field",
			label: "Delivery Address",
			description: "Enter the delivery address",
			inputType: "text",
		}),
	recipientName: TasksSchema.shape.recipientName
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-recipientName-update",
			type: "field",
			label: "Recipient Name",
			description: "Enter the recipient name (optional)",
			inputType: "text",
		}),
	recipientPhone: TasksSchema.shape.recipientPhone
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-recipientPhone-update",
			type: "field",
			label: "Recipient Phone",
			description: "Enter the recipient phone (optional)",
			inputType: "text",
		}),
	deliveryInstructions: TasksSchema.shape.deliveryInstructions
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-deliveryInstructions-update",
			type: "field",
			label: "Delivery Instructions",
			description: "Enter delivery instructions (optional)",
			inputType: "textarea",
		}),
	estimatedArrivalTime: TasksSchema.shape.estimatedArrivalTime
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-estimatedArrivalTime-update",
			type: "field",
			label: "Estimated Arrival Time",
			description: "Select the estimated arrival time (optional)",
			inputType: "date",
		}),
	status: TasksSchema.shape.status.optional().register(fieldRegistry, {
		id: "dm-tasks-status-update",
		type: "field",
		label: "Status",
		description: "Select the task status (optional)",
		inputType: "select",
	}),
	attempCount: TasksSchema.shape.attempCount
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-attempCount-update",
			type: "field",
			label: "Attempt Count",
			description: "Enter the attempt count (optional)",
			inputType: "number",
		}),
	attachments: TasksSchema.shape.attachments
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-attachments-update",
			type: "field",
			inputType: "file",
			label: "Attachments",
			description: "Upload attachments (optional)",
			isArray: true,
		}),
	failureReason: TasksSchema.shape.failureReason
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-failureReason-update",
			type: "field",
			label: "Failure Reason",
			description: "Select the failure reason (optional)",
			inputType: "select",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateTaskSchema>,
	validators: {
		onSubmit: UpdateTaskSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementTasks)
				.update(meta.id!, value);

			toast.success("Task updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update task: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateTaskForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useQuery({
		queryKey: ["tasks", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.DeliveryManagementTasks)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data || {},
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
					{...toAutoFormFieldSet(UpdateTaskSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Task</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateTaskForm;
