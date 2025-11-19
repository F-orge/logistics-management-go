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
import { VehiclesSchema } from "@/pocketbase/schemas/transport-management/vehicles";

export const CreateSchema = z.object({
  registrationNumber: VehiclesSchema.shape.registrationNumber.register(
    fieldRegistry,
    {
      id: "transport-management-vehicles-registrationNumber-create",
      type: "field",
      label: "RegistrationNumber",
      description: "Enter a registrationnumber",
      inputType: "text",
    }
  ),
  model: VehiclesSchema.shape.model.register(fieldRegistry, {
    id: "transport-management-vehicles-model-create",
    type: "field",
    label: "Model",
    description: "Enter a model",
    inputType: "text",
  }),
  capacityVolume: VehiclesSchema.shape.capacityVolume.register(fieldRegistry, {
    id: "transport-management-vehicles-capacityVolume-create",
    type: "field",
    label: "CapacityVolume",
    description: "Enter a capacityvolume",
    inputType: "number",
  }),
  capacityWeight: VehiclesSchema.shape.capacityWeight.register(fieldRegistry, {
    id: "transport-management-vehicles-capacityWeight-create",
    type: "field",
    label: "CapacityWeight",
    description: "Enter a capacityweight",
    inputType: "number",
  }),
  status: VehiclesSchema.shape.status.register(fieldRegistry, {
    id: "transport-management-vehicles-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  maintenances: VehiclesSchema.shape.maintenances.register(fieldRegistry, {
    id: "transport-management-vehicles-maintenances-create",
    type: "field",
    label: "Maintenances",
    description: "Enter a maintenances",
    inputType: "text",
  }),
  gps_pings: VehiclesSchema.shape.gps_pings.register(fieldRegistry, {
    id: "transport-management-vehicles-gps_pings-create",
    type: "field",
    label: "Gps_pings",
    description: "Enter a gps_pings",
    inputType: "text",
  }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateSchema>,
  validators: {
    onSubmit: CreateSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta.pocketbase
        .collection(Collections.TransportManagementVehicles)
        .create(value);
      toast.success("Vehicles created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create vehicles: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateForm = () => {
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
          <form.SubmitButton>Create Vehicles</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
