import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateReorderPointInputSchema,
  UpdateReorderPointInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createReorderPointSchema = CreateReorderPointInputSchema();
export const updateReorderPointSchema = UpdateReorderPointInputSchema();

export const createReorderPointFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createReorderPointSchema>,
});

export const updateReorderPointFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateReorderPointSchema>,
});

export const CreateReorderPointForm = withForm({
  ...createReorderPointFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Reorder Point</FieldLegend>
        <FieldDescription>
          Fill in the details for the new reorder point.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Reorder Point Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="threshold">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateReorderPointForm = withForm({
  ...updateReorderPointFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Reorder Point</FieldLegend>
        <FieldDescription>
          Update the details for the reorder point.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Reorder Point Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="threshold">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
