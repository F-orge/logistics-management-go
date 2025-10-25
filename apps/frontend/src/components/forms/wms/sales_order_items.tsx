import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateSalesOrderItemInputSchema,
  UpdateSalesOrderItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createSalesOrderItemSchema = CreateSalesOrderItemInputSchema();
export const updateSalesOrderItemSchema = UpdateSalesOrderItemInputSchema();

export const createSalesOrderItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createSalesOrderItemSchema>,
});

export const updateSalesOrderItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateSalesOrderItemSchema>,
});

export const CreateSalesOrderItemForm = withForm({
  ...createSalesOrderItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Sales Order Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new sales order item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityOrdered">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateSalesOrderItemForm = withForm({
  ...updateSalesOrderItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Sales Order Item</FieldLegend>
        <FieldDescription>
          Update the details for the sales order item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityOrdered">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
