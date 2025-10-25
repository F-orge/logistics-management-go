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
  CreateTaskEventInputSchema,
  UpdateTaskEventInputSchema,
  CreateTaskEventMutation,
  UpdateTaskEventMutation,
  TaskEvents,
} from "@packages/graphql/client";
import { SearchDeliveryTasksQuery, execute } from "@packages/graphql/client";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const createTaskEventSchema = CreateTaskEventInputSchema();
export const updateTaskEventSchema = UpdateTaskEventInputSchema();

export const createTaskEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTaskEventSchema>,
});

export const updateTaskEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTaskEventSchema>,
});

export const CreateTaskEventForm = withForm({
  ...createTaskEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Task Event</FieldLegend>
        <FieldDescription>
          Fill in the details for the new task event.
        </FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>
              Event status and reason information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Status change for this event."
                    placeholder="e.g., Started, In Progress, Completed, Failed"
                  />
                )}
              </form.AppField>
              <form.AppField name="reason">
                {(field) => (
                  <field.TextAreaField
                    label="Reason"
                    description="Reason for the status change."
                    placeholder="e.g., Traffic delay, Customer not available"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Additional notes about this event."
                    placeholder="Any additional notes..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>
              Geographic location where this event occurred.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="longitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Longitude"
                      description="Longitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>
              When this event occurred and associated delivery task.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp *"
                    description="When this event occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryTaskId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDeliveryTasksQuery,
                        { search: query || "" }
                      );
                      return (data?.dms?.deliveryTasks || []).map((item) => ({
                        value: item.value,
                        label: item.label || item.value,
                      }));
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Delivery Task *"
                    description="The delivery task this event is associated with."
                    placeholder="Search delivery task..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateTaskEventForm = withForm({
  ...updateTaskEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Task Event</FieldLegend>
        <FieldDescription>
          Update the details for the task event.
        </FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>
              Update event status and reason information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Status change for this event."
                    placeholder="e.g., Started, In Progress, Completed, Failed"
                  />
                )}
              </form.AppField>
              <form.AppField name="reason">
                {(field) => (
                  <field.TextAreaField
                    label="Reason"
                    description="Reason for the status change."
                    placeholder="e.g., Traffic delay, Customer not available"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Additional notes about this event."
                    placeholder="Any additional notes..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>
              Update geographic location where this event occurred.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="longitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Longitude"
                      description="Longitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>
              Update timestamp and associated delivery task.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp"
                    description="When this event occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryTaskId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDeliveryTasksQuery,
                        { search: query || "" }
                      );
                      return (data?.dms?.deliveryTasks || []).map((item) => ({
                        value: item.value,
                        label: item.label || item.value,
                      }));
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Delivery Task"
                    description="The delivery task this event is associated with."
                    placeholder="Search delivery task..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const NewTaskEventDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/dms/task-events" });
  const searchQuery = useSearch({ from: "/dashboard/dms/task-events" });

  const form = useAppForm({
    ...createTaskEventFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateTaskEventMutation,
        { taskEvent: value }
      );

      if (data) {
        toast.success("Successfully created task event");
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
            <CreateTaskEventForm form={form} />
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

export const UpdateTaskEventDialogForm = ({ data }: { data: TaskEvents[] }) => {
  const navigate = useNavigate({ from: "/dashboard/dms/task-events" });
  const searchQuery = useSearch({ from: "/dashboard/dms/task-events" });

  const taskEvent = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateTaskEventFormOption,
    defaultValues: taskEvent,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateTaskEventMutation,
        { id: taskEvent.id, taskEvent: value }
      );

      if (data) {
        toast.success("Successfully updated task event");
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
            <UpdateTaskEventForm form={form} />
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
