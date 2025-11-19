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
import { TasksSchema } from "@/pocketbase/schemas/delivery-management/tasks";

export const UpdateSchema = z.object({
  deliveryAddress: TasksSchema.shape.deliveryAddress
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-deliveryAddress-update",
      type: "field",
      label: "DeliveryAddress",
      description: "Enter a deliveryaddress",
      inputType: "textarea",
    }),
  recipientName: TasksSchema.shape.recipientName
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-recipientName-update",
      type: "field",
      label: "RecipientName",
      description: "Enter a recipientname",
      inputType: "text",
    }),
  recipientPhone: TasksSchema.shape.recipientPhone
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-recipientPhone-update",
      type: "field",
      label: "RecipientPhone",
      description: "Enter a recipientphone",
      inputType: "text",
    }),
  deliveryInstructions: TasksSchema.shape.deliveryInstructions
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-deliveryInstructions-update",
      type: "field",
      label: "DeliveryInstructions",
      description: "Enter a deliveryinstructions",
      inputType: "textarea",
    }),
  estimatedArrivalTime: TasksSchema.shape.estimatedArrivalTime
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-estimatedArrivalTime-update",
      type: "field",
      label: "EstimatedArrivalTime",
      description: "Enter an estimatedarrivaltime",
      inputType: "date",
    }),
  actualArrivalTime: TasksSchema.shape.actualArrivalTime
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-actualArrivalTime-update",
      type: "field",
      label: "ActualArrivalTime",
      description: "Enter an actualarrivaltime",
      inputType: "date",
    }),
  status: TasksSchema.shape.status.optional().register(fieldRegistry, {
    id: "delivery-management-tasks-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  attempCount: TasksSchema.shape.attempCount
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-attempCount-update",
      type: "field",
      label: "AttempCount",
      description: "Enter an attempcount",
      inputType: "number",
    }),
  failureReason: TasksSchema.shape.failureReason
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-tasks-failureReason-update",
      type: "field",
      label: "FailureReason",
      description: "Enter a failurereason",
      inputType: "select",
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
        .pocketbase!.collection(Collections.DeliveryManagementTasks)
        .update(meta.id!, value);

      toast.success("Task updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update task: ${error.message} (${error.status})`
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

  const { data } = useSuspenseQuery({
    queryKey: ["tasks", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.DeliveryManagementTasks)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: {
      ...data,
      estimatedArrivalTime: data.estimatedArrivalTime
        ? new Date(data.estimatedArrivalTime)
        : undefined,
      actualArrivalTime: data.actualArrivalTime
        ? new Date(data.actualArrivalTime)
        : undefined,
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
          <form.SubmitButton>Update Task</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateTaskForm;
