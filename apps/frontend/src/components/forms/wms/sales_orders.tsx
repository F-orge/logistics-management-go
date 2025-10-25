import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateSalesOrderInputSchema,
  UpdateSalesOrderInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createSalesOrderSchema = CreateSalesOrderInputSchema();
export const updateSalesOrderSchema = UpdateSalesOrderInputSchema();

export const createSalesOrderFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createSalesOrderSchema>,
});

export const updateSalesOrderFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateSalesOrderSchema>,
});

export const CreateSalesOrderForm = withForm({
  ...createSalesOrderFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Sales Order</FieldLegend>
        <FieldDescription>Create a new sales order.</FieldDescription>
        <FieldGroup>
          {/* Order Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Order Information</FieldLegend>
            <FieldDescription>Order number and identification.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="orderNumber">
                  {(field) => (
                    <field.InputField
                      label="Order Number *"
                      description="Unique sales order identifier."
                      placeholder="e.g., SO-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Order status."
                      placeholder="e.g., Pending, Confirmed, Shipped"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="shippingAddress">
                {(field) => (
                  <field.InputField
                    label="Shipping Address *"
                    description="Delivery address for order."
                    placeholder="Full address"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link order to client and CRM opportunity.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client *"
                      description="Customer placing order."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="crmOpportunityId">
                  {(field) => (
                    <field.InputField
                      label="CRM Opportunity"
                      description="Associated CRM opportunity (optional)."
                      placeholder="Opportunity ID"
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

export const UpdateSalesOrderForm = withForm({
  ...updateSalesOrderFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Sales Order</FieldLegend>
        <FieldDescription>Update sales order details.</FieldDescription>
        <FieldGroup>
          {/* Order Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Order Information</FieldLegend>
            <FieldDescription>Update order number and status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="orderNumber">
                  {(field) => (
                    <field.InputField
                      label="Order Number"
                      description="Unique sales order identifier."
                      placeholder="e.g., SO-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Order status."
                      placeholder="e.g., Pending, Confirmed, Shipped"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="shippingAddress">
                {(field) => (
                  <field.InputField
                    label="Shipping Address"
                    description="Delivery address for order."
                    placeholder="Full address"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update client and CRM opportunity associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client"
                      description="Customer placing order."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="crmOpportunityId">
                  {(field) => (
                    <field.InputField
                      label="CRM Opportunity"
                      description="Associated CRM opportunity (optional)."
                      placeholder="Opportunity ID"
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
