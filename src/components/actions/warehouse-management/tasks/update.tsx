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
import { TasksSchema } from "@/pocketbase/schemas/warehouse-management/tasks";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  user: TasksSchema.shape.user.register(fieldRegistry, {
    id: "warehouse-management-tasks-user-update",
    type: "field",
    label: "User",
    description: "Enter an user",
    inputType: "relation",
    props: {
      collectionName: Collections.Users,
      displayField: "email",
      relationshipName: "user",
    },
  }),
  type: TasksSchema.shape.type.register(fieldRegistry, {
    id: "warehouse-management-tasks-type-update",
    type: "field",
    label: "Type",
    description: "Enter a type",
    inputType: "select",
  }),
  status: TasksSchema.shape.status.register(fieldRegistry, {
    id: "warehouse-management-tasks-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  priority: TasksSchema.shape.priority.register(fieldRegistry, {
    id: "warehouse-management-tasks-priority-update",
    type: "field",
    label: "Priority",
    description: "Enter a priority",
    inputType: "number",
  }),
  pickBatchId: TasksSchema.shape.pickBatchId.register(fieldRegistry, {
    id: "warehouse-management-tasks-pickBatchId-update",
    type: "field",
    label: "PickBatchId",
    description: "Enter a pickbatchid",
    inputType: "relation",
    props: {
      collectionName: Collections.WarehouseManagementPickBatches,
      displayField: "name",
      relationshipName: "pickBatchId",
    },
  }),
  instructions: TasksSchema.shape.instructions.register(fieldRegistry, {
    id: "warehouse-management-tasks-instructions-update",
    type: "field",
    label: "Instructions",
    description: "Enter an instructions",
    inputType: "textarea",
  }),
  notes: TasksSchema.shape.notes.register(fieldRegistry, {
    id: "warehouse-management-tasks-notes-update",
    type: "field",
    label: "Notes",
    description: "Enter a notes",
    inputType: "textarea",
  }),
  startTime: TasksSchema.shape.startTime.register(fieldRegistry, {
    id: "warehouse-management-tasks-startTime-update",
    type: "field",
    label: "StartTime",
    description: "Enter a starttime",
    inputType: "date",
    props: {
      showTime: true,
    },
  }),
  endTime: TasksSchema.shape.endTime.register(fieldRegistry, {
    id: "warehouse-management-tasks-endTime-update",
    type: "field",
    label: "EndTime",
    description: "Enter an endtime",
    inputType: "date",
    props: {
      showTime: true,
    },
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
        .pocketbase!.collection(Collections.WarehouseManagementTasks)
        .update(meta.id!, value);

      toast.success("Tasks updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update tasks: ${error.message} (${error.status})`
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
    queryKey: ["tasks", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.WarehouseManagementTasks)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: {
      ...data,
      startTime: data.startTime ? new Date(data.startTime) : undefined,
      endTime: data.endTime ? new Date(data.endTime) : undefined,
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
          <form.SubmitButton>Update Tasks</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
