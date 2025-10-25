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
        <FieldDescription>Fill in the details for the new driver schedule.</FieldDescription>
        <FieldGroup>
          {/* Schedule Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Schedule Details</FieldLegend>
            <FieldDescription>Set the date range and reason for the schedule.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Start Date *"
                      description="When the schedule begins."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="End Date *"
                      description="When the schedule ends."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason"
                    description="Reason for the schedule (e.g., vacation, training, maintenance)."
                    placeholder="e.g., Vacation, Training, Medical Leave"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this schedule to a driver.</FieldDescription>
            <FieldGroup>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver *"
                    description="The driver this schedule applies to."
                    placeholder="Driver ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
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
        <FieldDescription>Update the details for the driver schedule.</FieldDescription>
        <FieldGroup>
          {/* Schedule Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Schedule Details</FieldLegend>
            <FieldDescription>Update the date range and reason for the schedule.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Start Date"
                      description="When the schedule begins."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="End Date"
                      description="When the schedule ends."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason"
                    description="Reason for the schedule (e.g., vacation, training, maintenance)."
                    placeholder="e.g., Vacation, Training, Medical Leave"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update the driver association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver"
                    description="The driver this schedule applies to."
                    placeholder="Driver ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
