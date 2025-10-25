import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDisputeInputSchema,
  UpdateDisputeInputSchema,
  SearchCompaniesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createDisputeSchema = CreateDisputeInputSchema();
export const updateDisputeSchema = UpdateDisputeInputSchema();

export const createDisputeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDisputeSchema>,
});

export const updateDisputeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDisputeSchema>,
});

export const CreateDisputeForm = withForm({
  ...createDisputeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Dispute</FieldLegend>
        <FieldDescription>Create a billing dispute.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link dispute to invoice line item and client.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lineItemId">
                  {(field) => (
                    <field.InputField
                      label="Line Item *"
                      description="Invoice line item being disputed."
                      placeholder="Line Item ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="clientId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchCompaniesQuery,
                          { search: query || "" }
                        );
                        return data?.crm?.companies || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Client *"
                      description="Client submitting dispute."
                      placeholder="Search client..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Dispute Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Dispute Details</FieldLegend>
            <FieldDescription>Reason and amount in dispute.</FieldDescription>
            <FieldGroup>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason *"
                    description="Reason for dispute."
                    placeholder="e.g., Incorrect Amount, Duplicate Charge"
                  />
                )}
              </form.AppField>
              <form.AppField name="disputedAmount">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Disputed Amount *"
                    description="Amount being disputed."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Current dispute status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Dispute status (open, resolved, etc)."
                    placeholder="e.g., Open, In Review, Resolved"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Resolution Section */}
          <FieldSet>
            <FieldLegend variant="label">Resolution</FieldLegend>
            <FieldDescription>Resolution notes and timeline.</FieldDescription>
            <FieldGroup>
              <form.AppField name="resolutionNotes">
                {(field) => (
                  <field.InputField
                    label="Resolution Notes"
                    description="Notes on dispute resolution."
                    placeholder="Enter resolution details..."
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="submittedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Submitted At"
                      description="When dispute was submitted."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="resolvedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Resolved At"
                      description="When dispute was resolved."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="resolvedByUserId">
                {(field) => (
                  <field.InputField
                    label="Resolved By"
                    description="User who resolved dispute."
                    placeholder="User ID"
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

export const UpdateDisputeForm = withForm({
  ...updateDisputeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Dispute</FieldLegend>
        <FieldDescription>Update dispute information.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update dispute associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lineItemId">
                  {(field) => (
                    <field.InputField
                      label="Line Item"
                      description="Invoice line item."
                      placeholder="Line Item ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="clientId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchCompaniesQuery,
                          { search: query || "" }
                        );
                        return data?.crm?.companies || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Client"
                      description="Client for dispute."
                      placeholder="Search client..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Dispute Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Dispute Details</FieldLegend>
            <FieldDescription>Update reason and amount.</FieldDescription>
            <FieldGroup>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason"
                    description="Reason for dispute."
                    placeholder="e.g., Incorrect Amount, Duplicate"
                  />
                )}
              </form.AppField>
              <form.AppField name="disputedAmount">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Disputed Amount"
                    description="Amount being disputed."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Update dispute status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Dispute status."
                    placeholder="e.g., Open, In Review, Resolved"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Resolution Section */}
          <FieldSet>
            <FieldLegend variant="label">Resolution</FieldLegend>
            <FieldDescription>Update resolution information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="resolutionNotes">
                {(field) => (
                  <field.InputField
                    label="Resolution Notes"
                    description="Notes on resolution."
                    placeholder="Enter resolution details..."
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="submittedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Submitted At"
                      description="When dispute was submitted."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="resolvedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Resolved At"
                      description="When dispute was resolved."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="resolvedByUserId">
                {(field) => (
                  <field.InputField
                    label="Resolved By"
                    description="User who resolved dispute."
                    placeholder="User ID"
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
