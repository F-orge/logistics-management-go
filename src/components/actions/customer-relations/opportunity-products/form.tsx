import z from "zod";
import { Button } from "@/components/ui/button";
import { withFieldGroup } from "@/components/ui/forms";
import { Collections, CustomerRelationsProductsResponse } from "@/lib/pb.types";
import { OpportunityProductsSchema } from "@/pocketbase/schemas/customer-relations";

export type OpportunityProductsProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};

export const OpportunityProductsForm = withFieldGroup({
  defaultValues: {} as z.infer<typeof OpportunityProductsSchema>,
  props: {} as OpportunityProductsProps,
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
              description="Product associated with the opportunity."
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
              description="Quantity of this product in the opportunity."
              tooltip="Example: 10"
            >
              <field.NumberField min={0} step={1} />
            </field.Field>
          )}
        </group.AppField>
        {/* priceSnapshot */}
        <group.AppField name="priceSnapshot">
          {(field) => (
            <field.Field
              className="col-span-1"
              title="Price Snapshot"
              description="Price of product at time of opportunity creation."
              tooltip="Example: 2500"
            >
              <field.NumberField addonStart="₱" min={0} />
            </field.Field>
          )}
        </group.AppField>
      </group.FieldSet>
    );
  },
});
