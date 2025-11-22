import z from "zod";
import { withForm } from "@/components/ui/forms";
import { SalesOrdersSchema } from "@/pocketbase/schemas/warehouse-management/sales-orders";

export type SalesOrdersFormProps = {
  action?: "create" | "edit";
};

export const SalesOrdersForm = withForm({
  defaultValues: {} as z.infer<typeof SalesOrdersSchema>,
  props: {} as SalesOrdersFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* orderNumber - string */}
        {/* customer - string (relation) */}
        {/* orderDate - date */}
        {/* deliveryDate - date */}
        {/* status - enum */}
        {/* totalAmount - number */}
        {/* notes - rich text */}
      </form.FieldSet>
    );
  },
});
