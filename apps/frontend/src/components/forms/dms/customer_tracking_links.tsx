import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCustomerTrackingLinkInputSchema,
  UpdateCustomerTrackingLinkInputSchema,
  SearchDeliveryTasksQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createCustomerTrackingLinkSchema =
  CreateCustomerTrackingLinkInputSchema();
export const updateCustomerTrackingLinkSchema =
  UpdateCustomerTrackingLinkInputSchema();

export const createCustomerTrackingLinkFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCustomerTrackingLinkSchema>,
});

export const updateCustomerTrackingLinkFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCustomerTrackingLinkSchema>,
});

export const CreateCustomerTrackingLinkForm = withForm({
  ...createCustomerTrackingLinkFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Customer Tracking Link</FieldLegend>
        <FieldDescription>
          Fill in the details for the new customer tracking link.
        </FieldDescription>
        <FieldGroup>
          {/* Link Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Link Information</FieldLegend>
            <FieldDescription>
              Generate and configure the tracking link for the customer.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="trackingToken">
                {(field) => (
                  <field.InputField
                    label="Tracking Token *"
                    description="Unique token for accessing the tracking link."
                    placeholder="Generate or enter tracking token"
                  />
                )}
              </form.AppField>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Whether this tracking link is currently active."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Access Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Access Information</FieldLegend>
            <FieldDescription>
              Track access statistics and expiration for this link.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="accessCount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Access Count"
                      description="Number of times this link has been accessed."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="lastAccessedAt">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Last Accessed"
                      description="When the link was last accessed."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="expiresAt">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Expires At"
                    description="When this tracking link will expire."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this tracking token to a delivery task.
            </FieldDescription>
            <FieldGroup>
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
                    description="The delivery task this tracking link is for."
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

export const UpdateCustomerTrackingLinkForm = withForm({
  ...updateCustomerTrackingLinkFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Customer Tracking Link</FieldLegend>
        <FieldDescription>
          Update the details for the customer tracking link.
        </FieldDescription>
        <FieldGroup>
          {/* Link Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Link Information</FieldLegend>
            <FieldDescription>
              Update the tracking link configuration.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="trackingToken">
                {(field) => (
                  <field.InputField
                    label="Tracking Token"
                    description="Unique token for accessing the tracking link."
                    placeholder="Generate or enter tracking token"
                  />
                )}
              </form.AppField>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Whether this tracking link is currently active."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Access Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Access Information</FieldLegend>
            <FieldDescription>
              Update access statistics and expiration for this link.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="accessCount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Access Count"
                      description="Number of times this link has been accessed."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="lastAccessedAt">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Last Accessed"
                      description="When the link was last accessed."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="expiresAt">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Expires At"
                    description="When this tracking link will expire."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update the delivery task association.
            </FieldDescription>
            <FieldGroup>
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
                    description="The delivery task this tracking link is for."
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
