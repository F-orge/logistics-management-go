import z from "zod";
import { Button } from "@/components/ui/button";
import { withFieldGroup } from "@/components/ui/forms";
import { Collections, CustomerRelationsInvoicesRecord } from "@/lib/pb.types";
import { InvoiceItemsSchema } from "@/pocketbase/schemas/customer-relations";

export type InvoiceItemsProps = {
  action?: "create" | "edit";
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
        {/* invoice - relation */}
        {/* product - relation */}
        {/* quantity - number */}
        {/* price - number */}
      </group.FieldSet>
    );
  },
});
