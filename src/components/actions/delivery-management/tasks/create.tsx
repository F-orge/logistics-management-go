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
  TypedPocketBase,
  WarehouseManagementPackagesRecord,
} from "@/lib/pb.types";
import { TasksSchema } from "@/pocketbase/schemas/delivery-management/tasks";

export const CreateSchema = z.object({
  package: TasksSchema.shape.package.register(fieldRegistry, {
    id: "delivery-management-tasks-package-create",
    type: "field",
    label: "Package",
    description: "Enter a package",
    inputType: "relation",
    props: {
      collectionName: Collections.WarehouseManagementPackages,
      displayField: "packageNumber",
      relationshipName: "package",
      renderOption: (record) => record.packageNumber,
    } as RelationFieldProps<WarehouseManagementPackagesRecord>,
  }),
  deliveryAddress: TasksSchema.shape.deliveryAddress.register(fieldRegistry, {
    id: "delivery-management-tasks-deliveryAddress-create",
    type: "field",
    label: "DeliveryAddress",
    description: "Enter a deliveryaddress",
    inputType: "textarea",
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
      inputType: "textarea",
    }
  ),
  estimatedArrivalTime: TasksSchema.shape.estimatedArrivalTime.register(
    fieldRegistry,
    {
      id: "delivery-management-tasks-estimatedArrivalTime-create",
      type: "field",
      label: "EstimatedArrivalTime",
      description: "Enter an estimatedarrivaltime",
      inputType: "date",
      props: {
        showTime: true,
      },
    }
  ),
  status: TasksSchema.shape.status.register(fieldRegistry, {
    id: "delivery-management-tasks-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  attachments: TasksSchema.shape.attachments.register(fieldRegistry, {
    id: "delivery-management-tasks-attachments-create",
    type: "field",
    label: "Attachments",
    description: "Enter attachments",
    inputType: "file",
    isArray: true,
  }),
});

const FormOption = formOptions({
  defaultValues: {
    status: "pending",
  } as z.infer<typeof CreateSchema>,
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
          `Failed to create task: ${error.message} (${error.status})`
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
