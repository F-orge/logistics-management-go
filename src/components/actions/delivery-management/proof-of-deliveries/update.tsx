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
import { ProofOfDeliveriesSchema } from "@/pocketbase/schemas/delivery-management/proof-of-deliveries";
import { CreateProofOfDeliverySchema } from "./create";

export const UpdateSchema = z.object({
  task: ProofOfDeliveriesSchema.shape.task.optional().register(fieldRegistry, {
    id: "delivery-management-proof-of-deliveries-task-update",
    type: "field",
    label: "Task",
    description: "Enter a task",
    inputType: "text",
  }),
  signatureData: ProofOfDeliveriesSchema.shape.signatureData
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-proof-of-deliveries-signatureData-update",
      type: "field",
      label: "SignatureData",
      description: "Enter a signaturedata",
      inputType: "text",
    }),
  recipientName: ProofOfDeliveriesSchema.shape.recipientName
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-proof-of-deliveries-recipientName-update",
      type: "field",
      label: "RecipientName",
      description: "Enter a recipientname",
      inputType: "text",
    }),
  coordinates: ProofOfDeliveriesSchema.shape.coordinates
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-proof-of-deliveries-coordinates-update",
      type: "field",
      label: "Coordinates",
      description: "Enter a coordinates",
      inputType: "text",
    }),
  timestamp: ProofOfDeliveriesSchema.shape.timestamp
    .optional()
    .register(fieldRegistry, {
      id: "delivery-management-proof-of-deliveries-timestamp-update",
      type: "field",
      label: "Timestamp",
      description: "Enter a timestamp",
      inputType: "date",
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

  const { data } = useSuspenseQuery({
    queryKey: ["proof-of-deliveries", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.DeliveryManagementProofOfDeliveries)
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
          <form.SubmitButton>Update Proof of Delivery</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateProofOfDeliveryForm;
