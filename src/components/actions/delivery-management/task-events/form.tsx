import z from "zod";
import { withForm } from "@/components/ui/forms";
import { TaskEventsSchema } from "@/pocketbase/schemas/delivery-management/task-events";

export type TaskEventsFormProps = {
  action?: "create" | "edit";
};

export const TaskEventsForm = withForm({
  defaultValues: {} as z.infer<typeof TaskEventsSchema>,
  props: {} as TaskEventsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* task - string (relation) */}
        {/* status - enum */}
        {/* reason - string */}
        {/* notes - string */}
        {/* coordinates - json */}
        {/* timestamp - datetime */}
      </form.FieldSet>
    );
  },
});
