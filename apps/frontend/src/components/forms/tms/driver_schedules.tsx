import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDriverScheduleInputSchema,
  UpdateDriverScheduleInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDriverScheduleSchema = CreateDriverScheduleInputSchema();
export const updateDriverScheduleSchema = UpdateDriverScheduleInputSchema();

export const createDriverScheduleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDriverScheduleSchema>,
});

export const updateDriverScheduleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDriverScheduleSchema>,
});

export const CreateDriverScheduleForm = withForm({
  ...createDriverScheduleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Driver Schedule</FieldLegend>
        <FieldDescription>
          Fill in the details for the new driver schedule.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Schedule Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="startDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="endDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateDriverScheduleForm = withForm({
  ...updateDriverScheduleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Driver Schedule</FieldLegend>
        <FieldDescription>
          Update the details for the driver schedule.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Schedule Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="startDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="endDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
