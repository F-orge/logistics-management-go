import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateWarehouseInputSchema,
  UpdateWarehouseInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createWarehouseSchema = CreateWarehouseInputSchema();
export const updateWarehouseSchema = UpdateWarehouseInputSchema();

export const createWarehouseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createWarehouseSchema>,
});

export const updateWarehouseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateWarehouseSchema>,
});

export const CreateWarehouseForm = withForm({
  ...createWarehouseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Warehouse</FieldLegend>
        <FieldDescription>
          Fill in the details for the new warehouse.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Warehouse Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="address">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="city">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="state">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="postalCode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="country">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="timezone">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPerson">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactEmail">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateWarehouseForm = withForm({
  ...updateWarehouseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Warehouse</FieldLegend>
        <FieldDescription>
          Update the details for the warehouse.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Warehouse Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="address">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="city">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="state">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="postalCode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="country">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="timezone">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPerson">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactEmail">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
