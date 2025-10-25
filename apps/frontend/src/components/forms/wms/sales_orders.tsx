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
        <FieldDescription>
          Fill in the details for the new sales order.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Order Details</FieldLegend>
            <form.AppField name="orderNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="crmOpportunityId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="shippingAddress">
              {(field) => <field.InputField />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the sales order.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Order Details</FieldLegend>
            <form.AppField name="orderNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="crmOpportunityId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="shippingAddress">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
