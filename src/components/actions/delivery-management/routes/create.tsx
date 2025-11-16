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
import {
  Collections,
  TypedPocketBase,
} from "@/lib/pb.types";
import { RoutesSchema } from "@/pocketbase/schemas/delivery-management/routes";

export const CreateRouteSchema = z.object({
  driver: RoutesSchema.shape.driver.optional().register(fieldRegistry, {
    id: "dm-routes-driver-create",
    type: "field",
    label: "Driver",
    description: "Select the driver (optional)",
    inputType: "text",
  }),
  routeDate: RoutesSchema.shape.routeDate.optional().register(fieldRegistry, {
    id: "dm-routes-routeDate-create",
    type: "field",
    label: "Route Date",
    description: "Select the route date (optional)",
    inputType: "date",
  }),
  status: RoutesSchema.shape.status.optional().register(fieldRegistry, {
    id: "dm-routes-status-create",
    type: "field",
    label: "Status",
    description: "Select the route status (optional)",
    inputType: "select",
  }),
  totalDistance: RoutesSchema.shape.totalDistance.optional().register(fieldRegistry, {
    id: "dm-routes-totalDistance-create",
    type: "field",
    label: "Total Distance",
    description: "Enter the total distance (optional)",
    inputType: "number",
  }),
  estimatedDurationInMinutes: RoutesSchema.shape.estimatedDurationInMinutes.optional().register(fieldRegistry, {
    id: "dm-routes-estimatedDurationInMinutes-create",
    type: "field",
    label: "Estimated Duration (Minutes)",
    description: "Enter estimated duration in minutes (optional)",
    inputType: "number",
  }),
});

const FormOption = formOptions({
  defaultValues: {} as z.infer<typeof CreateRouteSchema>,
  validators: {
    onSubmit: CreateRouteSchema,
  },
  onSubmitMeta: {} as {
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  },
  onSubmit: async ({ value, meta }) => {
    try {
      await meta
        .pocketbase!.collection(Collections.DeliveryManagementRoutes)
        .create(value);

      toast.success("Route created successfully!");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(
          `Failed to create route: ${error.message} (${error.status})`
        );
      }
    } finally {
      meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  },
});

const CreateRouteForm = () => {
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
          {...toAutoFormFieldSet(CreateRouteSchema)}
        />
        <DialogFooter>
          <form.SubmitButton>Create Route</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
};

export default CreateRouteForm;
