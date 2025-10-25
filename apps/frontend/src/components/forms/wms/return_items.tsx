import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateReturnItemInputSchema,
  UpdateReturnItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createReturnItemSchema = CreateReturnItemInputSchema();
export const updateReturnItemSchema = UpdateReturnItemInputSchema();

export const createReturnItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createReturnItemSchema>,
});

export const updateReturnItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateReturnItemSchema>,
});

export const CreateReturnItemForm = withForm({
  ...createReturnItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Return Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new return item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="returnId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityExpected">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="quantityReceived">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="condition">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateReturnItemForm = withForm({
  ...updateReturnItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Return Item</FieldLegend>
        <FieldDescription>
          Update the details for the return item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="returnId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityExpected">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="quantityReceived">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="condition">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
