import z from "zod";
import { withForm } from "@/components/ui/forms";
import { ProductsSchema } from "@/pocketbase/schemas/customer-relations";

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
        {/* name - string */}
        {/* sku - string */}
        {/* price - number */}
        {/* type - enum */}
        {/* description - rich text */}
        {/* attachments - file array */}
      </form.FieldSet>
    );
  },
});
