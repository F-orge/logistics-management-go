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
  BillingManagementLogsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { BillingManagementLogsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementLogsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.BillingManagementLogs>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementLogs)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Logs created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementLogsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.BillingManagementLogs>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementLogs)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Logs updated successfully",
        })
        .unwrap();
    },
  });

export const LogsForm = withForm({
  defaultValues: {} as Create<Collections.BillingManagementLogs> | Update<Collections.BillingManagementLogs>,
  render: ({ form }) => {
return (
      <form.AppForm>
        <FieldSet>
          {/* System */}
          <FieldGroup>
            <FieldLegend>System</FieldLegend>
            <FieldDescription>
              Manage system information
            </FieldDescription>

            <form.AppField name="externalSystem">
              {(field) => (
                <field.TextField
                  label="External System"
                  description="External system name"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Record */}
          <FieldGroup>
            <FieldLegend>Record</FieldLegend>
            <FieldDescription>
              Manage record information
            </FieldDescription>

            <form.AppField name="recordType">
              {(field) => (
                <field.TextField
                  label="Record Type"
                  description="Type of record being logged"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="recordId">
              {(field) => (
                <field.TextField
                  label="Record Id"
                  description="ID of the record"
                  placeholder=""
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
                  description="Current status"
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "In-progress", value: "in-progress" },
                    { label: "Success", value: "success" },
                    { label: "Failed", value: "failed" },
                    { label: "Retry", value: "retry" }
                  ]}
                  placeholder="Select..."
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* External */}
          <FieldGroup>
            <FieldLegend>External</FieldLegend>
            <FieldDescription>
              Manage external information
            </FieldDescription>

            <form.AppField name="externalId">
              {(field) => (
                <field.TextField
                  label="External Id"
                  description="External system ID"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Tracking */}
          <FieldGroup>
            <FieldLegend>Tracking</FieldLegend>
            <FieldDescription>
              Manage tracking information
            </FieldDescription>

            <form.AppField name="lastSyncAt">
              {(field) => (
                <field.DateTimeField
                  label="Last Sync At"
                  description="Last sync date"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Retry */}
          <FieldGroup>
            <FieldLegend>Retry</FieldLegend>
            <FieldDescription>
              Manage retry information
            </FieldDescription>

            <form.AppField name="nextRetryAt">
              {(field) => (
                <field.DateTimeField
                  label="Next Retry At"
                  description="Next retry date"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="retryCount">
              {(field) => (
                <field.NumberField
                  label="Retry Count"
                  description="Number of retry attempts"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Error */}
          <FieldGroup>
            <FieldLegend>Error</FieldLegend>
            <FieldDescription>
              Manage error information
            </FieldDescription>

            <form.AppField name="errorMessage">
              {(field) => (
                <field.TextareaField
                  label="Error Message"
                  description="Error message if failed"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Payloads */}
          <FieldGroup>
            <FieldLegend>Payloads</FieldLegend>
            <FieldDescription>
              Manage payloads information
            </FieldDescription>

            <form.AppField name="requestPayload">
              {(field) => (
                <field.TextareaField
                  label="Request Payload"
                  description="Request payload sent"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="responsePayload">
              {(field) => (
                <field.TextareaField
                  label="Response Payload"
                  description="Response payload received"
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
        <LogsForm form={form as any} />
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
    queryKey: ["logs", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementLogs)
        .getOne<BillingManagementLogsRecord>(searchQuery.id!),
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
        <LogsForm form={form as any} />
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
