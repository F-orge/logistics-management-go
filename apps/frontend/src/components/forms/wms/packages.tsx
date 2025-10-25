import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePackageInputSchema,
  UpdatePackageInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPackageSchema = CreatePackageInputSchema();
export const updatePackageSchema = UpdatePackageInputSchema();

export const createPackageFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPackageSchema>,
});

export const updatePackageFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePackageSchema>,
});

export const CreatePackageForm = withForm({
  ...createPackageFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Package</FieldLegend>
        <FieldDescription>
          Fill in the details for the new package.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Package Details</FieldLegend>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packageNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packageType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="length">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="width">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="height">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="trackingNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="carrier">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceLevel">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packedByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="shippedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="isFragile">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="isHazmat">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="requiresSignature">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="insuranceValue">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdatePackageForm = withForm({
  ...updatePackageFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Package</FieldLegend>
        <FieldDescription>
          Update the details for the package.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Package Details</FieldLegend>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packageNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packageType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="length">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="width">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="height">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="trackingNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="carrier">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceLevel">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packedByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="packedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="shippedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="isFragile">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="isHazmat">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="requiresSignature">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="insuranceValue">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
