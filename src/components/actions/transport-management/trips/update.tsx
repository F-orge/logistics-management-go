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
import { RelationFieldProps } from "@/components/ui/forms/fields";
import {
  Collections,
  TransportManagementDriversResponse,
  TypedPocketBase,
  UsersRecord,
} from "@/lib/pb.types";
import { TripsSchema } from "@/pocketbase/schemas/transport-management/trips";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
  driver: TripsSchema.shape.driver.optional().register(fieldRegistry, {
    id: "transport-management-trips-driver-update",
    type: "field",
    label: "Driver",
    description: "Enter a driver",
    inputType: "relation",
    props: {
      collectionName: Collections.TransportManagementDrivers,
      displayField: "name",
      relationshipName: "driver",
      renderOption: (record) =>
        `${record.expand?.user?.name} (${record.expand?.user?.email}) - ${record.licenseNumber}`,
      recordListOption: { expand: "user" },
    } as RelationFieldProps<
      TransportManagementDriversResponse<{ user: UsersRecord }>
    >,
  }),
  vehicle: TripsSchema.shape.vehicle.optional().register(fieldRegistry, {
    id: "transport-management-trips-vehicle-update",
    type: "field",
    label: "Vehicle",
    description: "Enter a vehicle",
    inputType: "relation",
    props: {
      collectionName: Collections.TransportManagementVehicles,
      displayField: "registrationNumber",
      relationshipName: "vehicle",
    },
  }),
  status: TripsSchema.shape.status.optional().register(fieldRegistry, {
    id: "transport-management-trips-status-update",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
  startAddress: TripsSchema.shape.startAddress.register(fieldRegistry, {
    id: "transport-management-trips-startAddress-update",
    type: "field",
    label: "Start Address",
    description: "Enter a start address",
    inputType: "textarea",
  }),
  startTime: TripsSchema.shape.startTime.register(fieldRegistry, {
    id: "transport-management-trips-startTime-update",
    type: "field",
    label: "Start Time",
    description: "Enter a start time",
    inputType: "date",
    props: {
      showTime: true,
    },
  }),
  endAddress: TripsSchema.shape.endAddress.register(fieldRegistry, {
    id: "transport-management-trips-endAddress-update",
    type: "field",
    label: "End Address",
    description: "Enter an end address",
    inputType: "textarea",
  }),
  endTime: TripsSchema.shape.endTime.register(fieldRegistry, {
    id: "transport-management-trips-endTime-update",
    type: "field",
    label: "End Time",
    description: "Enter an end time",
    inputType: "date",
    props: {
      showTime: true,
    },
  }),
  coordinates: TripsSchema.shape.coordinates.register(fieldRegistry, {
    id: "transport-management-trips-coordinates-update",
    type: "field",
    label: "Coordinates",
    description: "Enter coordinates",
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
        .pocketbase!.collection(Collections.TransportManagementTrips)
        .update(meta.id!, value);

      toast.success("Trips updated successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to update trips: ${error.message} (${error.status})`
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
    queryKey: ["trips", searchQuery.id],

    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.TransportManagementTrips)
        .getOne(searchQuery.id!);
      return record;
    },
  });

  const form = useAppForm({
    ...FormOption,
    defaultValues: {
      ...data,
      startTime: data.startTime ? new Date(data.startTime) : undefined,
      endTime: data.endTime ? new Date(data.endTime) : undefined,
    } as z.infer<typeof UpdateSchema>,
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
          <form.SubmitButton>Update Trips</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default UpdateForm;
