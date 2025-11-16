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
import { TasksSchema } from "@/pocketbase/schemas/warehouse-management/tasks";

export const CreateSchema = z.object({
	taskNumber: TasksSchema.shape.taskNumber.register(fieldRegistry, {
		id: "warehouse-management-tasks-taskNumber-create",
		type: "field",
		label: "TaskNumber",
		description: "Enter a tasknumber",
		inputType: "text",
	}),
	user: TasksSchema.shape.user.register(fieldRegistry, {
		id: "warehouse-management-tasks-user-create",
		type: "field",
		label: "User",
		description: "Enter an user",
		inputType: "text",
	}),
	type: TasksSchema.shape.type.register(fieldRegistry, {
		id: "warehouse-management-tasks-type-create",
		type: "field",
		label: "Type",
		description: "Enter a type",
		inputType: "text",
	}),
	status: TasksSchema.shape.status.register(fieldRegistry, {
		id: "warehouse-management-tasks-status-create",
		type: "field",
		label: "Status",
		description: "Enter a status",
		inputType: "text",
	}),
	priority: TasksSchema.shape.priority.register(fieldRegistry, {
		id: "warehouse-management-tasks-priority-create",
		type: "field",
		label: "Priority",
		description: "Enter a priority",
		inputType: "number",
	}),
	instructions: TasksSchema.shape.instructions.register(fieldRegistry, {
		id: "warehouse-management-tasks-instructions-create",
		type: "field",
		label: "Instructions",
		description: "Enter an instructions",
		inputType: "text",
	}),
	notes: TasksSchema.shape.notes.register(fieldRegistry, {
		id: "warehouse-management-tasks-notes-create",
		type: "field",
		label: "Notes",
		description: "Enter a notes",
		inputType: "text",
	}),
	startTime: TasksSchema.shape.startTime.register(fieldRegistry, {
		id: "warehouse-management-tasks-startTime-create",
		type: "field",
		label: "StartTime",
		description: "Enter a starttime",
		inputType: "date",
	}),
	endTime: TasksSchema.shape.endTime.register(fieldRegistry, {
		id: "warehouse-management-tasks-endTime-create",
		type: "field",
		label: "EndTime",
		description: "Enter an endtime",
		inputType: "date",
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
				.collection(Collections.WarehouseManagementTasks)
				.create(value);
			toast.success("Tasks created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create tasks: ${error.message} (${error.status})`,
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
					<form.SubmitButton>Create Tasks</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
