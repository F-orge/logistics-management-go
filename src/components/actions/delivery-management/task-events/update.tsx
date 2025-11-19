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
import { TaskEventsSchema } from "@/pocketbase/schemas/delivery-management/task-events";

export const UpdateSchema = z.object({
	status: TaskEventsSchema.shape.status.register(fieldRegistry, {
		id: "delivery-management-task-events-status-update",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "select",
	}),
	reason: TaskEventsSchema.shape.reason.optional().register(fieldRegistry, {
		id: "delivery-management-task-events-reason-update",
		type: "field",
		label: "Reason",
		description: "Enter a reason",
		inputType: "textarea",
	}),
	notes: TaskEventsSchema.shape.notes.optional().register(fieldRegistry, {
		id: "delivery-management-task-events-notes-update",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "textarea",
	}),
	coordinates: TaskEventsSchema.shape.coordinates
		.optional()
		.register(fieldRegistry, {
			id: "delivery-management-task-events-coordinates-update",
			type: "field",
			label: "Coordinates",
			description: "Enter a coordinates",
			inputType: "geoPoint",
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

	const { data } = useSuspenseQuery({
		queryKey: ["task-events", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.DeliveryManagementTaskEvents)
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
					<form.SubmitButton>Update Task Event</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateTaskEventForm;
