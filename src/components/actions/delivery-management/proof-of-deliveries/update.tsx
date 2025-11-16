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
import { ProofOfDeliveriesSchema } from "@/pocketbase/schemas/delivery-management/proof-of-deliveries";
import { CreateProofOfDeliverySchema } from "./create";

export const UpdateProofOfDeliverySchema = z.object({
  task: ProofOfDeliveriesSchema.shape.task.optional().register(fieldRegistry, {
    id: "dm-proof-of-deliveries-task-update",
    type: "field",
    label: "Task",
    description: "Enter the task identifier (optional)",
    inputType: "text",
  }),
  signatureData: ProofOfDeliveriesSchema.shape.signatureData
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-signatureData-update",
      type: "field",
      label: "Signature Data",
      description: "Enter signature data (optional)",
      inputType: "text",
    }),
  recipientName: ProofOfDeliveriesSchema.shape.recipientName
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-recipientName-update",
      type: "field",
      label: "Recipient Name",
      description: "Enter the recipient name (optional)",
      inputType: "text",
    }),
  coordinates: ProofOfDeliveriesSchema.shape.coordinates
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-coordinates-update",
      type: "field",
      label: "Coordinates",
      description: "Enter the GPS coordinates (optional)",
      inputType: "text",
    }),
  timestamp: ProofOfDeliveriesSchema.shape.timestamp
    .optional()
    .register(fieldRegistry, {
      id: "dm-proof-of-deliveries-timestamp-update",
      type: "field",
      label: "Timestamp",
      description: "Select the timestamp (optional)",
      inputType: "date",
    }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof UpdateProofOfDeliverySchema>,
  validators: {
    onSubmit: UpdateProofOfDeliverySchema,
  },
  onSubmitMeta: {} as {
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.DeliveryManagementProofOfDeliveries)
        .update(meta.id!, value);

      toast.success("Proof of delivery updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update proof of delivery: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({
        search: (prev) => ({ ...prev, action: undefined, id: undefined }),
      });
    }
  },
});

const UpdateProofOfDeliveryForm = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useQuery({
    queryKey: ["proof-of-deliveries", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.DeliveryManagementProofOfDeliveries)
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
          {...toAutoFormFieldSet(UpdateProofOfDeliverySchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Update Proof of Delivery</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateProofOfDeliveryForm;
