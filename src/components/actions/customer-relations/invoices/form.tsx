import z from "zod";
import { withForm } from "@/components/ui/forms";
import { InvoicesSchema } from "@/pocketbase/schemas/customer-relations";

export type InvoicesFormProps = {
  action?: "create" | "edit";
};

export const InvoicesForm = withForm({
  defaultValues: {} as z.infer<typeof InvoicesSchema>,
  props: {} as InvoicesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* invoiceNumber - string */}
        {/* opportunity - string (relation) */}
        {/* status - enum */}
        {/* total - number */}
        {/* issueDate - date */}
        {/* dueDate - date */}
        {/* sentAt - date */}
        {/* paidAt - date */}
        {/* paymentMethod - enum */}
        {/* items - invoice-items (sub-table) */}
        {/* attachments - file array */}
      </form.FieldSet>
    );
  },
});
