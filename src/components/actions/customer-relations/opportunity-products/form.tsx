import { Trash } from "lucide-react";
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
              className="col-span-1"
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
        <div className="col-span-3 flex items-center gap-2.5 justify-between">
          <group.AppField name="quantity">
            {(field) => (
              <field.Field
                title="Quantity"
                description="Quantity of this product in the opportunity."
                tooltip="Example: 10"
              >
                <field.NumberField min={0} step={1} />
              </field.Field>
            )}
          </group.AppField>
          <Button variant="destructive" onClick={props.onRemove}>
            <Trash />
          </Button>
        </div>
      </group.FieldSet>
    );
  },
});
