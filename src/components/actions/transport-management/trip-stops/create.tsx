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
import { TripStopsSchema } from "@/pocketbase/schemas/transport-management/trip-stops";

export const CreateSchema = z.object({
  trip: TripStopsSchema.shape.trip.register(fieldRegistry, {
    id: "transport-management-trip-stops-trip-create",
    type: "field",
    label: "Trip",
    description: "Enter a trip",
    inputType: "relation",
    props: {
      collectionName: Collections.TransportManagementTrips,
      displayField: "id",
      relationshipName: "trip",
    },
  }),
  sequence: TripStopsSchema.shape.sequence.register(fieldRegistry, {
    id: "transport-management-trip-stops-sequence-create",
    type: "field",
    label: "Sequence",
    description: "Enter a sequence",
    inputType: "number",
  }),
  address: TripStopsSchema.shape.address.register(fieldRegistry, {
    id: "transport-management-trip-stops-address-create",
    type: "field",
    label: "Address",
    description: "Enter an address",
    inputType: "text",
  }),
  status: TripStopsSchema.shape.status.register(fieldRegistry, {
    id: "transport-management-trip-stops-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  estimatedArrivalTime: TripStopsSchema.shape.estimatedArrivalTime.register(
    fieldRegistry,
    {
      id: "transport-management-trip-stops-estimatedArrivalTime-create",
      type: "field",
      label: "EstimatedArrivalTime",
      description: "Enter an estimatedarrivaltime",
      inputType: "date",
    }
  ),
  actualArrivalTime: TripStopsSchema.shape.actualArrivalTime.register(
    fieldRegistry,
    {
      id: "transport-management-trip-stops-actualArrivalTime-create",
      type: "field",
      label: "ActualArrivalTime",
      description: "Enter an actualarrivaltime",
      inputType: "date",
    }
  ),
  estimatedDepartureTime: TripStopsSchema.shape.estimatedDepartureTime.register(
    fieldRegistry,
    {
      id: "transport-management-trip-stops-estimatedDepartureTime-create",
      type: "field",
      label: "EstimatedDepartureTime",
      description: "Enter an estimateddeparturetime",
      inputType: "date",
    }
  ),
  actualDepartureTime: TripStopsSchema.shape.actualDepartureTime.register(
    fieldRegistry,
    {
      id: "transport-management-trip-stops-actualDepartureTime-create",
      type: "field",
      label: "ActualDepartureTime",
      description: "Enter an actualdeparturetime",
      inputType: "date",
    }
  ),
  shipment: TripStopsSchema.shape.shipment.register(fieldRegistry, {
    id: "transport-management-trip-stops-shipment-create",
    type: "field",
    label: "Shipment",
    description: "Enter a shipment",
    inputType: "relation",
    props: {
      collectionName: Collections.WarehouseManagementOutboundShipments,
      displayField: "trackingNumber",
      relationshipName: "shipment",
    },
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
        .collection(Collections.TransportManagementTripStops)
        .create(value);
      toast.success("Trip Stops created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create trip-stops: ${error.message} (${error.status})`
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
          <form.SubmitButton>Create Trip Stops</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateForm;
