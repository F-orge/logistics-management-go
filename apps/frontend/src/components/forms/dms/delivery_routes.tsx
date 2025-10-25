import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@packages/ui/components/form/index";
import {
  Button,
  Dialog,
  DialogContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDeliveryRouteInputSchema,
  UpdateDeliveryRouteInputSchema,
  CreateDeliveryRouteMutation,
  UpdateDeliveryRouteMutation,
  DeliveryRoutes,
  execute,
} from "@packages/graphql/client";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const createDeliveryRouteSchema = CreateDeliveryRouteInputSchema();
export const updateDeliveryRouteSchema = UpdateDeliveryRouteInputSchema();

export const createDeliveryRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDeliveryRouteSchema>,
});

export const updateDeliveryRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDeliveryRouteSchema>,
});

export const CreateDeliveryRouteForm = withForm({
  ...createDeliveryRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Delivery Route</FieldLegend>
        <FieldDescription>
          Fill in the details for the new delivery route.
        </FieldDescription>
        <FieldGroup>
          {/* Route Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Details</FieldLegend>
            <FieldDescription>
              Basic information about the delivery route.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver *"
                    description="The driver assigned to this route."
                    placeholder="Driver ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="routeDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Route Date *"
                    description="The date for this delivery route."
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current status of the route."
                    placeholder="e.g., Planned, In Progress, Completed"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Route Optimization Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Optimization</FieldLegend>
            <FieldDescription>
              Optimized route data and distance/duration estimates.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="optimizedRouteData">
                {(field) => (
                  <field.InputField
                    label="Optimized Route Data"
                    description="JSON data containing the optimized route waypoints."
                    placeholder="Route optimization data..."
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="totalDistanceKm">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Distance (km)"
                      description="Total distance to be covered."
                      placeholder="0.00"
                      step="0.1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="estimatedDurationMinutes">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Duration (min)"
                      description="Estimated time to complete the route."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>Route execution timeline.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Started At"
                      description="When the route execution started."
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Completed At"
                      description="When the route execution completed."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateDeliveryRouteForm = withForm({
  ...updateDeliveryRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Delivery Route</FieldLegend>
        <FieldDescription>
          Update the details for the delivery route.
        </FieldDescription>
        <FieldGroup>
          {/* Route Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Details</FieldLegend>
            <FieldDescription>
              Basic information about the delivery route.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver"
                    description="The driver assigned to this route."
                    placeholder="Driver ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="routeDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Route Date"
                    description="The date for this delivery route."
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current status of the route."
                    placeholder="e.g., Planned, In Progress, Completed"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Route Optimization Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Optimization</FieldLegend>
            <FieldDescription>
              Update optimized route data and estimates.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="optimizedRouteData">
                {(field) => (
                  <field.InputField
                    label="Optimized Route Data"
                    description="JSON data containing the optimized route waypoints."
                    placeholder="Route optimization data..."
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="totalDistanceKm">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Distance (km)"
                      description="Total distance to be covered."
                      placeholder="0.00"
                      step="0.1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="estimatedDurationMinutes">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Duration (min)"
                      description="Estimated time to complete the route."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>
              Update route execution timeline.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Started At"
                      description="When the route execution started."
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Completed At"
                      description="When the route execution completed."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const NewDeliveryRouteDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/dms/delivery-routes" });
  const searchQuery = useSearch({ from: "/dashboard/dms/delivery-routes" });

  const form = useAppForm({
    ...createDeliveryRouteFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateDeliveryRouteMutation,
        { deliveryRoute: value }
      );

      if (data) {
        toast.success("Successfully created delivery route");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({ search: (prev) => ({ ...prev, new: undefined }) });
    },
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateDeliveryRouteForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Create
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateDeliveryRouteDialogForm = ({
  data,
}: {
  data: DeliveryRoutes[];
}) => {
  const navigate = useNavigate({ from: "/dashboard/dms/delivery-routes" });
  const searchQuery = useSearch({ from: "/dashboard/dms/delivery-routes" });

  const deliveryRoute = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateDeliveryRouteFormOption,
    defaultValues: deliveryRoute,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateDeliveryRouteMutation,
        { id: deliveryRoute.id, deliveryRoute: value }
      );

      if (data) {
        toast.success("Successfully updated delivery route");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.edit && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
        })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <UpdateDeliveryRouteForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Update
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
