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
import { TasksSchema } from "@/pocketbase/schemas/delivery-management/tasks";

export const CreateTaskSchema = z.object({
	package: TasksSchema.shape.package.register(fieldRegistry, {
		id: "dm-tasks-package-create",
		type: "field",
		label: "Package",
		description: "Enter the package identifier",
		inputType: "text",
	}),
	route: TasksSchema.shape.route.register(fieldRegistry, {
		id: "dm-tasks-route-create",
		type: "field",
		label: "Route",
		description: "Enter the route identifier",
		inputType: "text",
	}),
	sequence: TasksSchema.shape.sequence.register(fieldRegistry, {
		id: "dm-tasks-sequence-create",
		type: "field",
		label: "Sequence",
		description: "Enter the sequence number",
		inputType: "number",
	}),
	deliveryAddress: TasksSchema.shape.deliveryAddress.register(fieldRegistry, {
		id: "dm-tasks-deliveryAddress-create",
		type: "field",
		label: "Delivery Address",
		description: "Enter the delivery address",
		inputType: "text",
	}),
	recipientName: TasksSchema.shape.recipientName
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-recipientName-create",
			type: "field",
			label: "Recipient Name",
			description: "Enter the recipient name (optional)",
			inputType: "text",
		}),
	recipientPhone: TasksSchema.shape.recipientPhone
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-recipientPhone-create",
			type: "field",
			label: "Recipient Phone",
			description: "Enter the recipient phone (optional)",
			inputType: "text",
		}),
	deliveryInstructions: TasksSchema.shape.deliveryInstructions
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-deliveryInstructions-create",
			type: "field",
			label: "Delivery Instructions",
			description: "Enter delivery instructions (optional)",
			inputType: "textarea",
		}),
	estimatedArrivalTime: TasksSchema.shape.estimatedArrivalTime
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-estimatedArrivalTime-create",
			type: "field",
			label: "Estimated Arrival Time",
			description: "Select the estimated arrival time (optional)",
			inputType: "date",
		}),
	status: TasksSchema.shape.status.optional().register(fieldRegistry, {
		id: "dm-tasks-status-create",
		type: "field",
		label: "Status",
		description: "Select the task status (optional)",
		inputType: "select",
	}),
	attempCount: TasksSchema.shape.attempCount
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-attempCount-create",
			type: "field",
			label: "Attempt Count",
			description: "Enter the attempt count (optional)",
			inputType: "number",
		}),
	attachments: TasksSchema.shape.attachments
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-attachments-create",
			type: "field",
			inputType: "file",
			label: "Attachments",
			description: "Upload attachments (optional)",
			isArray: true,
		}),
	failureReason: TasksSchema.shape.failureReason
		.optional()
		.register(fieldRegistry, {
			id: "dm-tasks-failureReason-create",
			type: "field",
			label: "Failure Reason",
			description: "Select the failure reason (optional)",
			inputType: "select",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateTaskSchema>,
	validators: {
		onSubmit: CreateTaskSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementTasks)
				.create(value);

			toast.success("Task created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create task: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateTaskForm = () => {
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
					{...toAutoFormFieldSet(CreateTaskSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Task</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateTaskForm;
