import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateAccountingSyncLogInputSchema,
  UpdateAccountingSyncLogInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createAccountingSyncLogSchema = CreateAccountingSyncLogInputSchema();
export const updateAccountingSyncLogSchema = UpdateAccountingSyncLogInputSchema();

export const createAccountingSyncLogFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createAccountingSyncLogSchema>,
});

export const updateAccountingSyncLogFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateAccountingSyncLogSchema>,
});

export const CreateAccountingSyncLogForm = withForm({
  ...createAccountingSyncLogFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Accounting Sync Log</FieldLegend>
        <FieldDescription>
          Fill in the details for the new accounting sync log.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Log Details</FieldLegend>
            <form.AppField name="recordId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recordType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="externalSystem">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="externalId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="errorMessage">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="requestPayload">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="responsePayload">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="lastSyncAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="retryCount">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="nextRetryAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateAccountingSyncLogForm = withForm({
  ...updateAccountingSyncLogFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Accounting Sync Log</FieldLegend>
        <FieldDescription>
          Update the details for the accounting sync log.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Log Details</FieldLegend>
            <form.AppField name="recordId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recordType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="externalSystem">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="externalId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="errorMessage">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="requestPayload">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="responsePayload">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="lastSyncAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="retryCount">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="nextRetryAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
