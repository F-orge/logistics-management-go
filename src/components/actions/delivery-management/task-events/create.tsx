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
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
  Collections,
  DeliveryManagementRoutesRecord,
  DeliveryManagementTasksResponse,
  TypedPocketBase,
  WarehouseManagementPackagesRecord,
} from "@/lib/pb.types";
import { TaskEventsSchema } from "@/pocketbase/schemas/delivery-management/task-events";

export const CreateSchema = z.object({
  task: TaskEventsSchema.shape.task.register(fieldRegistry, {
    id: "delivery-management-task-events-task-create",
    type: "field",
    label: "Task",
    description: "Enter a task",
    inputType: "relation",
    props: {
      collectionName: Collections.DeliveryManagementTasks,
      displayField: "sequence",
      relationshipName: "task",
      recordListOption: { expand: "route,package" },
      renderOption: (record) =>
        `${record.sequence} - ${record.expand.route.name} - ${record.expand.package.packageNumber}`,
    } as RelationFieldProps<
      DeliveryManagementTasksResponse<{
        route: DeliveryManagementRoutesRecord;
        package: WarehouseManagementPackagesRecord;
      }>
    >,
  }),
  status: TaskEventsSchema.shape.status.register(fieldRegistry, {
    id: "delivery-management-task-events-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  reason: TaskEventsSchema.shape.reason.register(fieldRegistry, {
    id: "delivery-management-task-events-reason-create",
    type: "field",
    label: "Reason",
    description: "Enter a reason",
    inputType: "textarea",
  }),
  notes: TaskEventsSchema.shape.notes.register(fieldRegistry, {
    id: "delivery-management-task-events-notes-create",
    type: "field",
    label: "Notes",
    description: "Enter a notes",
    inputType: "textarea",
  }),
  coordinates: TaskEventsSchema.shape.coordinates.register(fieldRegistry, {
    id: "delivery-management-task-events-coordinates-create",
    type: "field",
    label: "Coordinates",
    description: "Enter a coordinates",
    inputType: "geoPoint",
  }),
});

const FormOption = formOptions({
  defaultValues: {
    timestamp: new Date(),
  } as Partial<z.infer<typeof CreateSchema>>,
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
        .pocketbase!.collection(Collections.DeliveryManagementTaskEvents)
        .create(value);

      toast.success("Task event created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create task event: ${error.message} (${error.status})`
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
          {...toAutoFormFieldSet(CreateSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Task Event</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateTaskEventForm;
