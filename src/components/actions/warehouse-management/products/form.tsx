import z from "zod";
import { withForm } from "@/components/ui/forms";
import { ProductsSchema } from "@/pocketbase/schemas/warehouse-management/products";

export type ProductsFormProps = {
  action?: "create" | "edit";
};

export const ProductsForm = withForm({
  defaultValues: {} as z.infer<typeof ProductsSchema>,
  props: {} as ProductsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* sku - string */}
        {/* name - string */}
        {/* barcode - string */}
        {/* description - string */}
        {/* category - string (relation) */}
        {/* price - number */}
        {/* unit - string */}
        {/* weight - number */}
        {/* length - number */}
        {/* width - number */}
        {/* height - number */}
        {/* status - enum */}
        {/* supplier - string (relation) */}
        {/* client - string (relation) */}
        {/* images - string array */}
      </form.FieldSet>
    );
  },
});
