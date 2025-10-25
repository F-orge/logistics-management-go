import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePartnerInvoiceItemInputSchema,
  UpdatePartnerInvoiceItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPartnerInvoiceItemSchema = CreatePartnerInvoiceItemInputSchema();
export const updatePartnerInvoiceItemSchema = UpdatePartnerInvoiceItemInputSchema();

export const createPartnerInvoiceItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPartnerInvoiceItemSchema>,
});

export const updatePartnerInvoiceItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePartnerInvoiceItemSchema>,
});

export const CreatePartnerInvoiceItemForm = withForm({
  ...createPartnerInvoiceItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Partner Invoice Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new partner invoice item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="partnerInvoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="shipmentLegId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdatePartnerInvoiceItemForm = withForm({
  ...updatePartnerInvoiceItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Partner Invoice Item</FieldLegend>
        <FieldDescription>
          Update the details for the partner invoice item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="partnerInvoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="shipmentLegId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
