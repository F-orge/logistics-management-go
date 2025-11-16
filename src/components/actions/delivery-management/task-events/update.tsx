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
import { TaskEventsSchema } from "@/pocketbase/schemas/delivery-management/task-events";
import { CreateTaskEventSchema } from "./create";

export const UpdateTaskEventSchema = z.object({
	task: TaskEventsSchema.shape.task.optional().register(fieldRegistry, {
		id: "dm-task-events-task-update",
		type: "field",
		label: "Task",
		description: "Enter the task identifier",
		inputType: "text",
	}),
	status: TaskEventsSchema.shape.status.optional().register(fieldRegistry, {
		id: "dm-task-events-status-update",
		type: "field",
		label: "Status",
		description: "Select the task event status (optional)",
		inputType: "select",
	}),
	reason: TaskEventsSchema.shape.reason.optional().register(fieldRegistry, {
		id: "dm-task-events-reason-update",
		type: "field",
		label: "Reason",
		description: "Enter the reason (optional)",
		inputType: "text",
	}),
	notes: TaskEventsSchema.shape.notes.optional().register(fieldRegistry, {
		id: "dm-task-events-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter additional notes (optional)",
		inputType: "textarea",
	}),
	coordinates: TaskEventsSchema.shape.coordinates
		.optional()
		.register(fieldRegistry, {
			id: "dm-task-events-coordinates-update",
			type: "field",
			label: "Coordinates",
			description: "Enter the GPS coordinates (optional)",
			inputType: "text",
		}),
	timestamp: TaskEventsSchema.shape.timestamp
		.optional()
		.register(fieldRegistry, {
			id: "dm-task-events-timestamp-update",
			type: "field",
			label: "Timestamp",
			description: "Select the timestamp (optional)",
			inputType: "date",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateTaskEventSchema>,
	validators: {
		onSubmit: UpdateTaskEventSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.DeliveryManagementTaskEvents)
				.update(meta.id!, value);

			toast.success("Task event updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update task event: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateTaskEventForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useQuery({
		queryKey: ["task-events", searchQuery.id],
		enabled: !!searchQuery.id,
		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.DeliveryManagementTaskEvents)
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
					{...toAutoFormFieldSet(UpdateTaskEventSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Task Event</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateTaskEventForm;
