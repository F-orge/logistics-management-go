import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
  DeliveryManagementTasksResponse,
  DeliveryManagementTaskEventsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { DeliveryManagementTaskEventsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = DeliveryManagementTaskEventsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.DeliveryManagementTaskEvents>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.DeliveryManagementTaskEvents)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `TaskEvents created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: DeliveryManagementTaskEventsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.DeliveryManagementTaskEvents>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.DeliveryManagementTaskEvents)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "TaskEvents updated successfully",
        })
        .unwrap();
    },
  });

export const TaskEventsForm = withForm({
  defaultValues: {} as Create<Collections.DeliveryManagementTaskEvents> | Update<Collections.DeliveryManagementTaskEvents>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Task */}
          <FieldGroup>
            <FieldLegend>Task</FieldLegend>
            <FieldDescription>
              Manage task information
            </FieldDescription>

            <form.AppField name="task">
              {(field) => (
                <field.RelationField<DeliveryManagementTasksResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.DeliveryManagementTasks}
                  relationshipName="task"
                  label="Task"
                  description="Associated delivery task"
                  displayField="id"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Status */}
          <FieldGroup>
            <FieldLegend>Status</FieldLegend>
            <FieldDescription>
              Manage status information
            </FieldDescription>

            <form.AppField name="status">
              {(field) => (
                <field.SelectField
                  label="Status"
                  description="Task status at this event"
                  options={[
                    { label: "Assigned", value: "assigned" },
                    { label: "Started", value: "started" },
                    { label: "Arrived", value: "arrived" },
                    { label: "Delivered", value: "delivered" },
                    { label: "Failed", value: "failed" },
                    { label: "Exception", value: "exception" },
                    { label: "Cancelled", value: "cancelled" },
                    { label: "Rescheduled", value: "rescheduled" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Timing */}
          <FieldGroup>
            <FieldLegend>Timing</FieldLegend>
            <FieldDescription>
              Manage timing information
            </FieldDescription>

            <form.AppField name="timestamp">
              {(field) => (
                <field.DateTimeField
                  label="Timestamp"
                  description="When event occurred"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Location */}
          <FieldGroup>
            <FieldLegend>Location</FieldLegend>
            <FieldDescription>
              Manage location information
            </FieldDescription>

            <form.AppField name="coordinates">
              {(field) => (
                <field.TextField
                  label="Coordinates"
                  description="Location when event occurred"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Details */}
          <FieldGroup>
            <FieldLegend>Details</FieldLegend>
            <FieldDescription>
              Manage details information
            </FieldDescription>

            <form.AppField name="notes">
              {(field) => (
                <field.TextareaField
                  label="Notes"
                  description="Event notes or comments"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Reason */}
          <FieldGroup>
            <FieldLegend>Reason</FieldLegend>
            <FieldDescription>
              Manage reason information
            </FieldDescription>

            <form.AppField name="reason">
              {(field) => (
                <field.TextareaField
                  label="Reason"
                  description="Reason for status change"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <TaskEventsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["taskevents", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.DeliveryManagementTaskEvents)
        .getOne<DeliveryManagementTaskEventsRecord>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <TaskEventsForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
