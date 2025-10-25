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
        <FieldDescription>Log accounting system synchronization.</FieldDescription>
        <FieldGroup>
          {/* Record Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Record Information</FieldLegend>
            <FieldDescription>Record details and external system mapping.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="recordId">
                  {(field) => (
                    <field.InputField
                      label="Record ID *"
                      description="ID of the record being synced."
                      placeholder="Record ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="recordType">
                  {(field) => (
                    <field.InputField
                      label="Record Type *"
                      description="Type of record (invoice, payment, etc)."
                      placeholder="e.g., Invoice, Payment"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="externalSystem">
                  {(field) => (
                    <field.InputField
                      label="External System *"
                      description="External accounting system name."
                      placeholder="e.g., QuickBooks, SAP"
                    />
                  )}
                </form.AppField>
                <form.AppField name="externalId">
                  {(field) => (
                    <field.InputField
                      label="External ID"
                      description="ID in external system."
                      placeholder="External ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Sync Status</FieldLegend>
            <FieldDescription>Current synchronization status and retry information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Sync status (pending, completed, failed)."
                      placeholder="e.g., Pending, Completed, Failed"
                    />
                  )}
                </form.AppField>
                <form.AppField name="retryCount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Retry Count"
                      description="Number of sync retry attempts."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="errorMessage">
                {(field) => (
                  <field.InputField
                    label="Error Message"
                    description="Error details if sync failed."
                    placeholder="Error description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Payload Section */}
          <FieldSet>
            <FieldLegend variant="label">Sync Payload</FieldLegend>
            <FieldDescription>Request and response payloads.</FieldDescription>
            <FieldGroup>
              <form.AppField name="requestPayload">
                {(field) => (
                  <field.InputField
                    label="Request Payload"
                    description="Data sent to external system."
                    placeholder="JSON payload..."
                  />
                )}
              </form.AppField>
              <form.AppField name="responsePayload">
                {(field) => (
                  <field.InputField
                    label="Response Payload"
                    description="Response from external system."
                    placeholder="JSON response..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamps</FieldLegend>
            <FieldDescription>Sync timing and next retry schedule.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lastSyncAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Last Sync"
                      description="When sync last occurred."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="nextRetryAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Next Retry"
                      description="When next retry is scheduled."
                      placeholder="YYYY-MM-DDTHH:mm"
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

export const UpdateAccountingSyncLogForm = withForm({
  ...updateAccountingSyncLogFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Accounting Sync Log</FieldLegend>
        <FieldDescription>Update synchronization log details.</FieldDescription>
        <FieldGroup>
          {/* Record Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Record Information</FieldLegend>
            <FieldDescription>Update record details and system mapping.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="recordId">
                  {(field) => (
                    <field.InputField
                      label="Record ID"
                      description="ID of the record being synced."
                      placeholder="Record ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="recordType">
                  {(field) => (
                    <field.InputField
                      label="Record Type"
                      description="Type of record."
                      placeholder="e.g., Invoice, Payment"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="externalSystem">
                  {(field) => (
                    <field.InputField
                      label="External System"
                      description="External system name."
                      placeholder="e.g., QuickBooks, SAP"
                    />
                  )}
                </form.AppField>
                <form.AppField name="externalId">
                  {(field) => (
                    <field.InputField
                      label="External ID"
                      description="ID in external system."
                      placeholder="External ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Sync Status</FieldLegend>
            <FieldDescription>Update synchronization status and retry info.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Sync status."
                      placeholder="e.g., Pending, Completed, Failed"
                    />
                  )}
                </form.AppField>
                <form.AppField name="retryCount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Retry Count"
                      description="Number of retry attempts."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="errorMessage">
                {(field) => (
                  <field.InputField
                    label="Error Message"
                    description="Error details if failed."
                    placeholder="Error description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Payload Section */}
          <FieldSet>
            <FieldLegend variant="label">Sync Payload</FieldLegend>
            <FieldDescription>Update request and response payloads.</FieldDescription>
            <FieldGroup>
              <form.AppField name="requestPayload">
                {(field) => (
                  <field.InputField
                    label="Request Payload"
                    description="Data sent to external system."
                    placeholder="JSON payload..."
                  />
                )}
              </form.AppField>
              <form.AppField name="responsePayload">
                {(field) => (
                  <field.InputField
                    label="Response Payload"
                    description="Response from external system."
                    placeholder="JSON response..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamps</FieldLegend>
            <FieldDescription>Update sync timing and retry schedule.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lastSyncAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Last Sync"
                      description="When sync last occurred."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="nextRetryAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Next Retry"
                      description="When next retry is scheduled."
                      placeholder="YYYY-MM-DDTHH:mm"
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
