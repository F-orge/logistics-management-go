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
import { VehiclesSchema } from "@/pocketbase/schemas/transport-management/vehicles";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  registrationNumber: VehiclesSchema.shape.registrationNumber
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-vehicles-registrationNumber-update",
      type: "field",
      label: "RegistrationNumber",
      description: "Enter a registrationnumber",
      inputType: "text",
    }),
  model: VehiclesSchema.shape.model.optional().register(fieldRegistry, {
    id: "transport-management-vehicles-model-update",
    type: "field",
    label: "Model",
    description: "Enter a model",
    inputType: "text",
  }),
  capacityVolume: VehiclesSchema.shape.capacityVolume
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-vehicles-capacityVolume-update",
      type: "field",
      label: "CapacityVolume",
      description: "Enter a capacityvolume",
      inputType: "number",
    }),
  capacityWeight: VehiclesSchema.shape.capacityWeight
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-vehicles-capacityWeight-update",
      type: "field",
      label: "CapacityWeight",
      description: "Enter a capacityweight",
      inputType: "number",
    }),
  status: VehiclesSchema.shape.status.optional().register(fieldRegistry, {
    id: "transport-management-vehicles-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  maintenances: VehiclesSchema.shape.maintenances
    .optional()
    .register(fieldRegistry, {
      id: "transport-management-vehicles-maintenances-update",
      type: "field",
      label: "Maintenances",
      description: "Enter a maintenances",
      inputType: "text",
    }),
  gps_pings: VehiclesSchema.shape.gps_pings.optional().register(fieldRegistry, {
    id: "transport-management-vehicles-gps_pings-update",
    type: "field",
    label: "Gps_pings",
    description: "Enter a gps_pings",
    inputType: "text",
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
        .pocketbase!.collection(Collections.TransportManagementVehicles)
        .update(meta.id!, value);

      toast.success("Vehicles updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update vehicles: ${error.message} (${error.status})`
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
    queryKey: ["vehicles", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.TransportManagementVehicles)
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
          <form.SubmitButton>Update Vehicles</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
