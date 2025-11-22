import z from "zod";
import { withForm } from "@/components/ui/forms";
import { TasksSchema } from "@/pocketbase/schemas/delivery-management/tasks";

export type TasksFormProps = {
  action?: "create" | "edit";
};

export const TasksForm = withForm({
  defaultValues: {} as z.infer<typeof TasksSchema>,
  props: {} as TasksFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* package - string (relation) */}
        {/* route - string (relation) */}
        {/* sequence - number */}
        {/* deliveryAddress - string */}
        {/* recipientName - string */}
        {/* recipientPhone - string */}
        {/* deliveryInstructions - string */}
        {/* estimatedArrivalTime - date */}
        {/* actualArrivalTime - date */}
        {/* deliveryTime - date */}
        {/* status - enum */}
        {/* attempCount - number */}
        {/* failureReason - enum */}
        {/* attachments - file array */}
      </form.FieldSet>
    );
  },
});
