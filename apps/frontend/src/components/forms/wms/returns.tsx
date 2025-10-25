import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateReturnInputSchema,
  UpdateReturnInputSchema,
  SearchCompaniesQuery,
  SearchWarehousesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createReturnSchema = CreateReturnInputSchema();
export const updateReturnSchema = UpdateReturnInputSchema();

export const createReturnFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createReturnSchema>,
});

export const updateReturnFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateReturnSchema>,
});

export const CreateReturnForm = withForm({
  ...createReturnFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Return</FieldLegend>
        <FieldDescription>Create a new product return.</FieldDescription>
        <FieldGroup>
          {/* Return Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Return Information</FieldLegend>
            <FieldDescription>
              Return number and identification.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="returnNumber">
                  {(field) => (
                    <field.InputField
                      label="Return Number *"
                      description="Unique return identifier."
                      placeholder="e.g., RMA-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Return status."
                      placeholder="e.g., Pending, Approved, Processing"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason *"
                    description="Reason for return."
                    placeholder="e.g., Defective, Changed Mind, Damaged"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link return to sales order and client.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      description="Client initiating return."
                      placeholder="Search client..."
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

export const UpdateReturnForm = withForm({
  ...updateReturnFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Return</FieldLegend>
        <FieldDescription>Update return details.</FieldDescription>
        <FieldGroup>
          {/* Return Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Return Information</FieldLegend>
            <FieldDescription>
              Update return number, status, and reason.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="returnNumber">
                  {(field) => (
                    <field.InputField
                      label="Return Number"
                      description="Unique return identifier."
                      placeholder="e.g., RMA-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Return status."
                      placeholder="e.g., Pending, Approved, Processing"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason"
                    description="Reason for return."
                    placeholder="e.g., Defective, Changed Mind, Damaged"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update sales order and client associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      description="Client initiating return."
                      placeholder="Search client..."
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
