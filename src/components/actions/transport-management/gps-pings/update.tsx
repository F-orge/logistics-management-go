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
import { GpsPingsSchema } from "@/pocketbase/schemas/transport-management/gps-pings";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  vehicle: GpsPingsSchema.shape.vehicle.optional().register(fieldRegistry, {
    id: "transport-management-gps-pings-vehicle-update",
    type: "field",
    label: "Vehicle",
    description: "Enter a vehicle",
    inputType: "relation",
    props: {
      collectionName: Collections.TransportManagementVehicles,
      displayField: "name",
      relationshipName: "vehicle",
    },
  }),
  coordinates: GpsPingsSchema.shape.coordinates
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-gps-pings-coordinates-update",
      type: "field",
      label: "Coordinates",
      description: "Enter a coordinates",
      inputType: "text",
    }),
  timestamp: GpsPingsSchema.shape.timestamp.optional().register(fieldRegistry, {
    id: "transport-management-gps-pings-timestamp-update",
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
        .pocketbase!.collection(Collections.TransportManagementGpsPings)
        .update(meta.id!, value);

      toast.success("Gps Pings updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update gps-pings: ${error.message} (${error.status})`
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
    queryKey: ["gpsPings", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.TransportManagementGpsPings)
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
          <form.SubmitButton>Update Gps Pings</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
