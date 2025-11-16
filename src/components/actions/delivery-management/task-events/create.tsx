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
import { TaskEventsSchema } from "@/pocketbase/schemas/delivery-management/task-events";

export const CreateTaskEventSchema = z.object({
	task: TaskEventsSchema.shape.task.register(fieldRegistry, {
		id: "dm-task-events-task-create",
		type: "field",
		label: "Task",
		description: "Enter the task identifier",
		inputType: "text",
	}),
	status: TaskEventsSchema.shape.status.optional().register(fieldRegistry, {
		id: "dm-task-events-status-create",
		type: "field",
		label: "Status",
		description: "Select the task event status (optional)",
		inputType: "select",
	}),
	reason: TaskEventsSchema.shape.reason.optional().register(fieldRegistry, {
		id: "dm-task-events-reason-create",
		type: "field",
		label: "Reason",
		description: "Enter the reason (optional)",
		inputType: "text",
	}),
	notes: TaskEventsSchema.shape.notes.optional().register(fieldRegistry, {
		id: "dm-task-events-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter additional notes (optional)",
		inputType: "textarea",
	}),
	coordinates: TaskEventsSchema.shape.coordinates
		.optional()
		.register(fieldRegistry, {
			id: "dm-task-events-coordinates-create",
			type: "field",
			label: "Coordinates",
			description: "Enter the GPS coordinates (optional)",
			inputType: "text",
		}),
	timestamp: TaskEventsSchema.shape.timestamp
		.optional()
		.register(fieldRegistry, {
			id: "dm-task-events-timestamp-create",
			type: "field",
			label: "Timestamp",
			description: "Select the timestamp (optional)",
			inputType: "date",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateTaskEventSchema>,
	validators: {
		onSubmit: CreateTaskEventSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementTaskEvents)
				.create(value);

			toast.success("Task event created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create task event: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateTaskEventForm = () => {
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
					{...toAutoFormFieldSet(CreateTaskEventSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Task Event</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateTaskEventForm;
