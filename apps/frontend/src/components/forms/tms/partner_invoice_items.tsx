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
        <FieldDescription>Fill in the details for the new partner invoice item.</FieldDescription>
        <FieldGroup>
          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Line item amount for this invoice.</FieldDescription>
            <FieldGroup>
              <form.AppField name="amount">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Amount *"
                    description="Amount for this line item."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link item to invoice and shipment leg.</FieldDescription>
            <FieldGroup>
              <form.AppField name="partnerInvoiceId">
                {(field) => (
                  <field.InputField
                    label="Partner Invoice *"
                    description="The invoice this item belongs to."
                    placeholder="Partner Invoice ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="shipmentLegId">
                {(field) => (
                  <field.InputField
                    label="Shipment Leg *"
                    description="The shipment leg this charge is for."
                    placeholder="Shipment Leg ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
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
        <FieldDescription>Update the details for the partner invoice item.</FieldDescription>
        <FieldGroup>
          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Update line item amount for this invoice.</FieldDescription>
            <FieldGroup>
              <form.AppField name="amount">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Amount"
                    description="Amount for this line item."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update invoice and shipment leg associations.</FieldDescription>
            <FieldGroup>
              <form.AppField name="partnerInvoiceId">
                {(field) => (
                  <field.InputField
                    label="Partner Invoice"
                    description="The invoice this item belongs to."
                    placeholder="Partner Invoice ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="shipmentLegId">
                {(field) => (
                  <field.InputField
                    label="Shipment Leg"
                    description="The shipment leg this charge is for."
                    placeholder="Shipment Leg ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
