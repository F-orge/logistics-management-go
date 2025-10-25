import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTripStopInputSchema,
  UpdateTripStopInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createTripStopSchema = CreateTripStopInputSchema();
export const updateTripStopSchema = UpdateTripStopInputSchema();

export const createTripStopFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTripStopSchema>,
});

export const updateTripStopFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTripStopSchema>,
});

export const CreateTripStopForm = withForm({
  ...createTripStopFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Trip Stop</FieldLegend>
        <FieldDescription>Fill in the details for the new trip stop.</FieldDescription>
        <FieldGroup>
          {/* Stop Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Stop Information</FieldLegend>
            <FieldDescription>Address and sequence for this stop.</FieldDescription>
            <FieldGroup>
              <form.AppField name="address">
                {(field) => (
                  <field.InputField
                    label="Address *"
                    description="Delivery or pickup address for this stop."
                    placeholder="Enter stop address..."
                  />
                )}
              </form.AppField>
              <form.AppField name="sequence">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Sequence *"
                    description="Order of this stop in the trip."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current status of the stop."
                    placeholder="e.g., Pending, Arrived, Completed"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Estimated Times Section */}
          <FieldSet>
            <FieldLegend variant="label">Estimated Times</FieldLegend>
            <FieldDescription>Planned arrival and departure times.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Est. Arrival"
                      description="Estimated arrival time."
                    />
                  )}
                </form.AppField>
                <form.AppField name="estimatedDepartureTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Est. Departure"
                      description="Estimated departure time."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Actual Times Section */}
          <FieldSet>
            <FieldLegend variant="label">Actual Times</FieldLegend>
            <FieldDescription>Actual arrival and departure times (recorded after completion).</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="actualArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Actual Arrival"
                      description="When the vehicle actually arrived."
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualDepartureTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Actual Departure"
                      description="When the vehicle actually departed."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this stop to a trip and shipment.</FieldDescription>
            <FieldGroup>
              <form.AppField name="tripId">
                {(field) => (
                  <field.InputField
                    label="Trip *"
                    description="The trip this stop belongs to."
                    placeholder="Trip ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="shipmentId">
                {(field) => (
                  <field.InputField
                    label="Shipment *"
                    description="The shipment for this stop."
                    placeholder="Shipment ID"
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

export const UpdateTripStopForm = withForm({
  ...updateTripStopFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Trip Stop</FieldLegend>
        <FieldDescription>Update the details for the trip stop.</FieldDescription>
        <FieldGroup>
          {/* Stop Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Stop Information</FieldLegend>
            <FieldDescription>Update address and sequence for this stop.</FieldDescription>
            <FieldGroup>
              <form.AppField name="address">
                {(field) => (
                  <field.InputField
                    label="Address"
                    description="Delivery or pickup address for this stop."
                    placeholder="Enter stop address..."
                  />
                )}
              </form.AppField>
              <form.AppField name="sequence">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Sequence"
                    description="Order of this stop in the trip."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current status of the stop."
                    placeholder="e.g., Pending, Arrived, Completed"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Estimated Times Section */}
          <FieldSet>
            <FieldLegend variant="label">Estimated Times</FieldLegend>
            <FieldDescription>Update planned arrival and departure times.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Est. Arrival"
                      description="Estimated arrival time."
                    />
                  )}
                </form.AppField>
                <form.AppField name="estimatedDepartureTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Est. Departure"
                      description="Estimated departure time."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Actual Times Section */}
          <FieldSet>
            <FieldLegend variant="label">Actual Times</FieldLegend>
            <FieldDescription>Update actual arrival and departure times.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="actualArrivalTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Actual Arrival"
                      description="When the vehicle actually arrived."
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualDepartureTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Actual Departure"
                      description="When the vehicle actually departed."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update trip and shipment associations.</FieldDescription>
            <FieldGroup>
              <form.AppField name="tripId">
                {(field) => (
                  <field.InputField
                    label="Trip"
                    description="The trip this stop belongs to."
                    placeholder="Trip ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="shipmentId">
                {(field) => (
                  <field.InputField
                    label="Shipment"
                    description="The shipment for this stop."
                    placeholder="Shipment ID"
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
