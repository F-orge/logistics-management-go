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
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCustomerTrackingLinkSchema = CreateCustomerTrackingLinkInputSchema();
export const updateCustomerTrackingLinkSchema = UpdateCustomerTrackingLinkInputSchema();

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
          <FieldSet>
            <FieldLegend>Tracking Link Details</FieldLegend>
            <form.AppField name="deliveryTaskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="trackingToken">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="accessCount">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="lastAccessedAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="expiresAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
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
          <FieldSet>
            <FieldLegend>Tracking Link Details</FieldLegend>
            <form.AppField name="deliveryTaskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="trackingToken">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="accessCount">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="lastAccessedAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="expiresAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
