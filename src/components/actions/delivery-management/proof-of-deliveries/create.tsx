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
import { ProofOfDeliveriesSchema } from "@/pocketbase/schemas/delivery-management/proof-of-deliveries";

export const CreateSchema = z.object({
  task: ProofOfDeliveriesSchema.shape.task.register(fieldRegistry, {
    id: "delivery-management-proof-of-deliveries-task-create",
    type: "field",
    label: "Task",
    description: "Enter a task",
    inputType: "relation",
    props: {
      collectionName: Collections.DeliveryManagementTasks,
      displayField: "sequence",
      relationshipName: "task",
      recordListOption: { expand: "package" },
      renderOption: (record) => `${record.expand.package.packageNumber}`,
    } as RelationFieldProps<
      DeliveryManagementTasksResponse<{
        route: DeliveryManagementRoutesRecord;
        package: WarehouseManagementPackagesRecord;
      }>
    >,
  }),
  signatureData: ProofOfDeliveriesSchema.shape.signatureData.register(
    fieldRegistry,
    {
      id: "delivery-management-proof-of-deliveries-signatureData-create",
      type: "field",
      label: "SignatureData",
      description: "Enter a signaturedata",
      inputType: "file",
    }
  ),
  recipientName: ProofOfDeliveriesSchema.shape.recipientName.register(
    fieldRegistry,
    {
      id: "delivery-management-proof-of-deliveries-recipientName-create",
      type: "field",
      label: "RecipientName",
      description: "Enter a recipientname",
      inputType: "text",
    }
  ),
  coordinates: ProofOfDeliveriesSchema.shape.coordinates.register(
    fieldRegistry,
    {
      id: "delivery-management-proof-of-deliveries-coordinates-create",
      type: "field",
      label: "Coordinates",
      description: "Enter a coordinates",
      inputType: "geoPoint",
    }
  ),
});

const FormOption = formOptions({
  defaultValues: {
    timestamp: new Date(),
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
        .pocketbase!.collection(Collections.DeliveryManagementProofOfDeliveries)
        .create(value);

      toast.success("Proof of delivery created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create proof of delivery: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateProofOfDeliveryForm = () => {
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
          <form.SubmitButton>Create Proof of Delivery</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateProofOfDeliveryForm;
