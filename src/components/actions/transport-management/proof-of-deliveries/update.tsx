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
import { ProofOfDeliveriesSchema } from "@/pocketbase/schemas/transport-management/proof-of-deliveries";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  tripStop: ProofOfDeliveriesSchema.shape.tripStop
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-proof-of-deliveries-tripStop-update",
      type: "field",
      label: "TripStop",
      description: "Enter a trip stop",
      inputType: "relation",
      props: {
        collectionName: Collections.TransportManagementTripStops,
        displayField: "id",
        relationshipName: "tripStop",
      },
    }),
  coordinate: ProofOfDeliveriesSchema.shape.coordinate
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-proof-of-deliveries-coordinate-update",
      type: "field",
      label: "Coordinate",
      description: "Enter a coordinate",
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
        .pocketbase!.collection(
          Collections.TransportManagementProofOfDeliveries
        )
        .update(meta.id!, value);

      toast.success("Proof Of Deliveries updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update proof-of-deliveries: ${error.message} (${error.status})`
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
    queryKey: ["proofOfDeliveries", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.TransportManagementProofOfDeliveries)
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
          <form.SubmitButton>Update Proof Of Deliveries</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
