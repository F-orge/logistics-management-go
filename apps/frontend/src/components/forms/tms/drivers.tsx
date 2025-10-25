import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDriverInputSchema,
  UpdateDriverInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDriverSchema = CreateDriverInputSchema();
export const updateDriverSchema = UpdateDriverInputSchema();

export const createDriverFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDriverSchema>,
});

export const updateDriverFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDriverSchema>,
});

export const CreateDriverForm = withForm({
  ...createDriverFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Driver</FieldLegend>
        <FieldDescription>
          Fill in the details for the new driver.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Driver Details</FieldLegend>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="licenseNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="licenseExpiryDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateDriverForm = withForm({
  ...updateDriverFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Driver</FieldLegend>
        <FieldDescription>
          Update the details for the driver.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Driver Details</FieldLegend>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="licenseNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="licenseExpiryDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
