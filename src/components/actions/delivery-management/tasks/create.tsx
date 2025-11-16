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

export const CreateSchema = z.object({
	package: TasksSchema.shape.package.register(fieldRegistry, {
		id: "delivery-management-tasks-package-create",
		type: "field",
		label: "Package",
		description: "Enter a package",
		inputType: "text",
	}),
	route: TasksSchema.shape.route.register(fieldRegistry, {
		id: "delivery-management-tasks-route-create",
		type: "field",
		label: "Route",
		description: "Enter a route",
		inputType: "text",
	}),
	sequence: TasksSchema.shape.sequence.register(fieldRegistry, {
		id: "delivery-management-tasks-sequence-create",
		type: "field",
		label: "Sequence",
		description: "Enter a sequence",
		inputType: "number",
	}),
	deliveryAddress: TasksSchema.shape.deliveryAddress.register(fieldRegistry, {
		id: "delivery-management-tasks-deliveryAddress-create",
		type: "field",
		label: "DeliveryAddress",
		description: "Enter a deliveryaddress",
		inputType: "text",
	}),
	recipientName: TasksSchema.shape.recipientName.register(fieldRegistry, {
		id: "delivery-management-tasks-recipientName-create",
		type: "field",
		label: "RecipientName",
		description: "Enter a recipientname",
		inputType: "text",
	}),
	recipientPhone: TasksSchema.shape.recipientPhone.register(fieldRegistry, {
		id: "delivery-management-tasks-recipientPhone-create",
		type: "field",
		label: "RecipientPhone",
		description: "Enter a recipientphone",
		inputType: "text",
	}),
	deliveryInstructions: TasksSchema.shape.deliveryInstructions.register(
		fieldRegistry,
		{
			id: "delivery-management-tasks-deliveryInstructions-create",
			type: "field",
			label: "DeliveryInstructions",
			description: "Enter a deliveryinstructions",
			inputType: "text",
		},
	),
	estimatedArrivalTime: TasksSchema.shape.estimatedArrivalTime.register(
		fieldRegistry,
		{
			id: "delivery-management-tasks-estimatedArrivalTime-create",
			type: "field",
			label: "EstimatedArrivalTime",
			description: "Enter an estimatedarrivaltime",
			inputType: "date",
		},
	),
	actualArrivalTime: TasksSchema.shape.actualArrivalTime.register(
		fieldRegistry,
		{
			id: "delivery-management-tasks-actualArrivalTime-create",
			type: "field",
			label: "ActualArrivalTime",
			description: "Enter an actualarrivaltime",
			inputType: "date",
		},
	),
	deliveryTime: TasksSchema.shape.deliveryTime.register(fieldRegistry, {
		id: "delivery-management-tasks-deliveryTime-create",
		type: "field",
		label: "DeliveryTime",
		description: "Enter a deliverytime",
		inputType: "date",
	}),
	status: TasksSchema.shape.status.register(fieldRegistry, {
		id: "delivery-management-tasks-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	attempCount: TasksSchema.shape.attempCount.register(fieldRegistry, {
		id: "delivery-management-tasks-attempCount-create",
		type: "field",
		label: "AttempCount",
		description: "Enter an attempcount",
		inputType: "text",
	}),
	failureReason: TasksSchema.shape.failureReason.register(fieldRegistry, {
		id: "delivery-management-tasks-failureReason-create",
		type: "field",
		label: "FailureReason",
		description: "Enter a failurereason",
		inputType: "text",
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
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Task</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateTaskForm;
