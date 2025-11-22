import z from "zod";
import { Button } from "@/components/ui/button";
import { withFieldGroup } from "@/components/ui/forms";
import {
  Collections,
  CustomerRelationsInvoicesRecord,
  CustomerRelationsProductsResponse,
} from "@/lib/pb.types";
import { InvoiceItemsSchema } from "@/pocketbase/schemas/customer-relations";

export type InvoiceItemsProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};

export const InvoiceItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<typeof InvoiceItemsSchema>,
  props: {} as InvoiceItemsProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* product */}
        <group.AppField name="product">
          {(field) => (
            <field.Field
              className="col-span-2"
              title="Product"
              description="Product or service on this invoice line."
              tooltip="Select product"
            >
              <field.RelationField<CustomerRelationsProductsResponse>
                collectionName={Collections.CustomerRelationsProducts}
                relationshipName="product"
                renderOption={(item) => `${item.name} (${item.sku})`}
              />
            </field.Field>
          )}
        </group.AppField>
        {/* quantity */}
        <group.AppField name="quantity">
          {(field) => (
            <field.Field
              className="col-span-1"
              title="Quantity"
              description="Quantity of item."
              tooltip="Example: 5"
            >
              <field.NumberField min={0} step={1} />
            </field.Field>
          )}
        </group.AppField>
        {/* price */}
        <group.AppField name="price">
          {(field) => (
            <field.Field
              className="col-span-1"
              title="Unit Price"
              description="Price per unit."
              tooltip="Example: 1000"
            >
              <field.NumberField addonStart="₱" min={0} />
            </field.Field>
          )}
        </group.AppField>
      </group.FieldSet>
    );
  },
});
