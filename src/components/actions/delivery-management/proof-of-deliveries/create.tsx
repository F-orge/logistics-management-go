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
import { ProofOfDeliveriesSchema } from "@/pocketbase/schemas/delivery-management/proof-of-deliveries";

export const CreateProofOfDeliverySchema = z.object({
  task: ProofOfDeliveriesSchema.shape.task.optional().register(fieldRegistry, {
    id: "dm-proof-of-deliveries-task-create",
    type: "field",
    label: "Task",
    description: "Enter the task identifier (optional)",
    inputType: "text",
  }),
  signatureData: ProofOfDeliveriesSchema.shape.signatureData
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-signatureData-create",
      type: "field",
      label: "Signature Data",
      description: "Enter signature data (optional)",
      inputType: "text",
    }),
  recipientName: ProofOfDeliveriesSchema.shape.recipientName
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-recipientName-create",
      type: "field",
      label: "Recipient Name",
      description: "Enter the recipient name (optional)",
      inputType: "text",
    }),
  coordinates: ProofOfDeliveriesSchema.shape.coordinates
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-coordinates-create",
      type: "field",
      label: "Coordinates",
      description: "Enter the GPS coordinates (optional)",
      inputType: "text",
    }),
  timestamp: ProofOfDeliveriesSchema.shape.timestamp
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-timestamp-create",
      type: "field",
      label: "Timestamp",
      description: "Select the timestamp (optional)",
      inputType: "date",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateProofOfDeliverySchema>,
  validators: {
    onSubmit: CreateProofOfDeliverySchema,
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
          {...toAutoFormFieldSet(CreateProofOfDeliverySchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Proof of Delivery</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateProofOfDeliveryForm;
