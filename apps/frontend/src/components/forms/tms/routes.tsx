import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateRouteInputSchema,
  UpdateRouteInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createRouteSchema = CreateRouteInputSchema();
export const updateRouteSchema = UpdateRouteInputSchema();

export const createRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createRouteSchema>,
});

export const updateRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateRouteSchema>,
});

export const CreateRouteForm = withForm({
  ...createRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Route</FieldLegend>
        <FieldDescription>Fill in the details for the new route.</FieldDescription>
        <FieldGroup>
          {/* Route Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Details</FieldLegend>
            <FieldDescription>Optimized route data and parameters.</FieldDescription>
            <FieldGroup>
              <form.AppField name="optimizedRouteData">
                {(field) => (
                  <field.InputField
                    label="Optimized Route Data"
                    description="JSON data containing waypoints and route sequence."
                    placeholder="Route optimization data..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Distance & Duration Section */}
          <FieldSet>
            <FieldLegend variant="label">Distance & Duration</FieldLegend>
            <FieldDescription>Total distance and estimated duration for the route.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="totalDistance">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Distance (km) *"
                      description="Total route distance in kilometers."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="totalDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Duration (hours) *"
                      description="Estimated time to complete the route."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this route to a trip.</FieldDescription>
            <FieldGroup>
              <form.AppField name="tripId">
                {(field) => (
                  <field.InputField
                    label="Trip *"
                    description="The trip this route is associated with."
                    placeholder="Trip ID"
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

export const UpdateRouteForm = withForm({
  ...updateRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Route</FieldLegend>
        <FieldDescription>Update the details for the route.</FieldDescription>
        <FieldGroup>
          {/* Route Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Details</FieldLegend>
            <FieldDescription>Update optimized route data and parameters.</FieldDescription>
            <FieldGroup>
              <form.AppField name="optimizedRouteData">
                {(field) => (
                  <field.InputField
                    label="Optimized Route Data"
                    description="JSON data containing waypoints and route sequence."
                    placeholder="Route optimization data..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Distance & Duration Section */}
          <FieldSet>
            <FieldLegend variant="label">Distance & Duration</FieldLegend>
            <FieldDescription>Update total distance and estimated duration for the route.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="totalDistance">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Distance (km)"
                      description="Total route distance in kilometers."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="totalDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Duration (hours)"
                      description="Estimated time to complete the route."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update the trip association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="tripId">
                {(field) => (
                  <field.InputField
                    label="Trip"
                    description="The trip this route is associated with."
                    placeholder="Trip ID"
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
