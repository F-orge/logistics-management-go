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
import { GeofenceEventsSchema } from "@/pocketbase/schemas/transport-management/geofence-events";

export const CreateSchema = z.object({
  vehicle: GeofenceEventsSchema.shape.vehicle.register(fieldRegistry, {
    id: "transport-management-geofence-events-vehicle-create",
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
  geofence: GeofenceEventsSchema.shape.geofence.register(fieldRegistry, {
    id: "transport-management-geofence-events-geofence-create",
    type: "field",
    label: "Geofence",
    description: "Enter a geofence",
    inputType: "text",
  }),
  type: GeofenceEventsSchema.shape.type.register(fieldRegistry, {
    id: "transport-management-geofence-events-type-create",
    type: "field",
    label: "Type",
    description: "Enter a type",
    inputType: "select",
  }),
  timestamp: GeofenceEventsSchema.shape.timestamp.register(fieldRegistry, {
    id: "transport-management-geofence-events-timestamp-create",
    type: "field",
    label: "Timestamp",
    description: "Enter a timestamp",
    inputType: "date",
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
        .collection(Collections.TransportManagementGeofenceEvents)
        .create(value);
      toast.success("Geofence Events created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create geofence-events: ${error.message} (${error.status})`
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
          <form.SubmitButton>Create Geofence Events</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
