import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDeliveryTaskInputSchema,
  UpdateDeliveryTaskInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDeliveryTaskSchema = CreateDeliveryTaskInputSchema();
export const updateDeliveryTaskSchema = UpdateDeliveryTaskInputSchema();

export const createDeliveryTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDeliveryTaskSchema>,
});

export const updateDeliveryTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDeliveryTaskSchema>,
});

export const CreateDeliveryTaskForm = withForm({
  ...createDeliveryTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Delivery Task</FieldLegend>
        <FieldDescription>
          Fill in the details for the new delivery task.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Task Details</FieldLegend>
            <form.AppField name="packageId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="deliveryRouteId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="routeSequence">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="deliveryAddress">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recipientName">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recipientPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="deliveryInstructions">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="actualArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="deliveryTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="failureReason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="attemptCount">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateDeliveryTaskForm = withForm({
  ...updateDeliveryTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Delivery Task</FieldLegend>
        <FieldDescription>
          Update the details for the delivery task.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Task Details</FieldLegend>
            <form.AppField name="packageId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="deliveryRouteId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="routeSequence">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="deliveryAddress">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recipientName">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recipientPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="deliveryInstructions">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="actualArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="deliveryTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="failureReason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="attemptCount">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
