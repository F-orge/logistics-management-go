import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePartnerInvoiceInputSchema,
  UpdatePartnerInvoiceInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPartnerInvoiceSchema = CreatePartnerInvoiceInputSchema();
export const updatePartnerInvoiceSchema = UpdatePartnerInvoiceInputSchema();

export const createPartnerInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPartnerInvoiceSchema>,
});

export const updatePartnerInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePartnerInvoiceSchema>,
});

export const CreatePartnerInvoiceForm = withForm({
  ...createPartnerInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Partner Invoice</FieldLegend>
        <FieldDescription>
          Fill in the details for the new partner invoice.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Details</FieldLegend>
            <form.AppField name="carrierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="invoiceNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="invoiceDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="totalAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdatePartnerInvoiceForm = withForm({
  ...updatePartnerInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Partner Invoice</FieldLegend>
        <FieldDescription>
          Update the details for the partner invoice.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Details</FieldLegend>
            <form.AppField name="carrierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="invoiceNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="invoiceDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="totalAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
