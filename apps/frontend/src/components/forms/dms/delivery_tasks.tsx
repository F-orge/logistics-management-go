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
  CreateDeliveryTaskInputSchema,
  UpdateDeliveryTaskInputSchema,
  SearchPackagesQuery,
  SearchDeliveryRoutesQuery,
  execute,
  CreateDeliveryTaskMutation,
  UpdateDeliveryTaskMutation,
} from "@packages/graphql/client";
import z from "zod";
import { toast } from "sonner";
import { DeliveryTask } from "@/components/tables/dms/delivery_tasks";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const createDeliveryTaskSchema = CreateDeliveryTaskInputSchema();
export const updateDeliveryTaskSchema = UpdateDeliveryTaskInputSchema();

export const createDeliveryTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDeliveryTaskSchema>,
});

export const updateDeliveryTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDeliveryTaskSchema>,
});

export const CreateDeliveryTaskForm = withForm({
  ...createDeliveryTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Delivery Task</FieldLegend>
        <FieldDescription>
          Fill in the details for the new delivery task.
        </FieldDescription>
        <FieldGroup>
          {/* Recipient Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Recipient Information</FieldLegend>
            <FieldDescription>
              Details of the person receiving the delivery.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="recipientName">
                {(field) => (
                  <field.InputField
                    label="Recipient Name *"
                    description="Full name of the recipient."
                    placeholder="Enter recipient name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="recipientPhone">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Recipient Phone *"
                    description="Contact number of the recipient."
                    placeholder="+1-234-567-8900"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Delivery Address Section */}
          <FieldSet>
            <FieldLegend variant="label">Delivery Address</FieldLegend>
            <FieldDescription>
              Where the package should be delivered.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="deliveryAddress">
                {(field) => (
                  <field.InputField
                    label="Address *"
                    description="Full delivery address."
                    placeholder="Enter complete delivery address..."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryInstructions">
                {(field) => (
                  <field.TextAreaField
                    label="Delivery Instructions"
                    description="Special instructions for the delivery."
                    placeholder="e.g., Ring doorbell twice, leave with neighbor..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Package & Route Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Package & Route</FieldLegend>
            <FieldDescription>
              Package and route assignment details.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="packageId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchPackagesQuery,
                        { search: query || "" }
                      );
                      return data?.wms?.packages || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Package *"
                    description="The package to be delivered."
                    placeholder="Search package..."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryRouteId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDeliveryRoutesQuery,
                        { search: query || "" }
                      );
                      return data?.dms?.deliveryRoutes || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Delivery Route *"
                    description="The route this task is part of."
                    placeholder="Search route..."
                  />
                )}
              </form.AppField>
              <form.AppField name="routeSequence">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Route Sequence *"
                    description="Order of this task in the route."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timing Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing</FieldLegend>
            <FieldDescription>
              Estimated and actual delivery times.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Estimated Arrival"
                      description="Estimated time to arrive at the location."
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Actual Arrival"
                      description="When the driver actually arrived."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="deliveryTime">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Delivery Time"
                    description="When the package was delivered."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status & Attempts Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Attempts</FieldLegend>
            <FieldDescription>
              Current status and delivery attempt information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current status of the delivery task."
                    placeholder="e.g., Pending, In Transit, Delivered, Failed"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="attemptCount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Attempt Count"
                      description="Number of delivery attempts made."
                      placeholder="1"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="failureReason">
                  {(field) => (
                    <field.TextAreaField
                      label="Failure Reason"
                      description="Reason for failed delivery attempts."
                      placeholder="e.g., Address not found, Recipient unavailable"
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

export const UpdateDeliveryTaskForm = withForm({
  ...updateDeliveryTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Delivery Task</FieldLegend>
        <FieldDescription>
          Update the details for the delivery task.
        </FieldDescription>
        <FieldGroup>
          {/* Recipient Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Recipient Information</FieldLegend>
            <FieldDescription>
              Details of the person receiving the delivery.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="recipientName">
                {(field) => (
                  <field.InputField
                    label="Recipient Name"
                    description="Full name of the recipient."
                    placeholder="Enter recipient name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="recipientPhone">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Recipient Phone"
                    description="Contact number of the recipient."
                    placeholder="+1-234-567-8900"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Delivery Address Section */}
          <FieldSet>
            <FieldLegend variant="label">Delivery Address</FieldLegend>
            <FieldDescription>
              Where the package should be delivered.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="deliveryAddress">
                {(field) => (
                  <field.InputField
                    label="Address"
                    description="Full delivery address."
                    placeholder="Enter complete delivery address..."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryInstructions">
                {(field) => (
                  <field.TextAreaField
                    label="Delivery Instructions"
                    description="Special instructions for the delivery."
                    placeholder="e.g., Ring doorbell twice, leave with neighbor..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Package & Route Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Package & Route</FieldLegend>
            <FieldDescription>
              Package and route assignment details.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="packageId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchPackagesQuery,
                        { search: query || "" }
                      );
                      return data?.wms?.packages || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Package"
                    description="The package to be delivered."
                    placeholder="Search package..."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryRouteId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDeliveryRoutesQuery,
                        { search: query || "" }
                      );
                      return data?.dms?.deliveryRoutes || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Delivery Route"
                    description="The route this task is part of."
                    placeholder="Search route..."
                  />
                )}
              </form.AppField>
              <form.AppField name="routeSequence">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Route Sequence"
                    description="Order of this task in the route."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timing Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing</FieldLegend>
            <FieldDescription>
              Update estimated and actual delivery times.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Estimated Arrival"
                      description="Estimated time to arrive at the location."
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Actual Arrival"
                      description="When the driver actually arrived."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="deliveryTime">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Delivery Time"
                    description="When the package was delivered."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status & Attempts Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Attempts</FieldLegend>
            <FieldDescription>
              Update status and delivery attempt information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current status of the delivery task."
                    placeholder="e.g., Pending, In Transit, Delivered, Failed"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="attemptCount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Attempt Count"
                      description="Number of delivery attempts made."
                      placeholder="1"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="failureReason">
                  {(field) => (
                    <field.TextAreaField
                      label="Failure Reason"
                      description="Reason for failed delivery attempts."
                      placeholder="e.g., Address not found, Recipient unavailable"
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

export const NewDeliveryTaskDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/dms/delivery-tasks" });
  const searchQuery = useSearch({ from: "/dashboard/dms/delivery-tasks" });

  const form = useAppForm({
    ...createDeliveryTaskFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateDeliveryTaskMutation,
        { deliveryTask: value }
      );

      if (data) {
        toast.success("Successfully created delivery task");
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
            <CreateDeliveryTaskForm form={form} />
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

export const UpdateDeliveryTaskDialogForm = ({
  data,
}: {
  data: DeliveryTask[];
}) => {
  const navigate = useNavigate({ from: "/dashboard/dms/delivery-tasks" });
  const searchQuery = useSearch({ from: "/dashboard/dms/delivery-tasks" });

  const deliveryTask = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateDeliveryTaskFormOption,
    defaultValues: deliveryTask,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateDeliveryTaskMutation,
        { id: deliveryTask.id, deliveryTask: value }
      );

      if (data) {
        toast.success("Successfully updated delivery task");
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
            <UpdateDeliveryTaskForm form={form} />
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
